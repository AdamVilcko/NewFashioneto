package com.fashioneto.service;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fashioneto.dao.InvitationDAO;
import com.fashioneto.dao.UserDAO;
import com.fashioneto.persistence.Album;
import com.fashioneto.persistence.Invitation;
import com.fashioneto.persistence.User;
import com.fashioneto.persistence.UserStatus;
import com.fashioneto.security.SaltedSHA256PasswordEncoder;

@Service("userService")
@Transactional
public class UserServiceImpl implements UserService {

    @Value("${user.signup.invitationOnly}")
    private boolean invitationOnlySignup;
    @Value("${album.name.uploads}")
    private String albumNameUploads;
    @Value("${album.name.profilePictures}")
    private String albumNameProfilePictures;

    @Resource(name = "passwordEncoder")
    private SaltedSHA256PasswordEncoder passwordEncoder;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private UserDAO userDAO;
    @Autowired
    private InvitationDAO invitationDAO;

    @Override
    public List<User> getUsers() {
	return userDAO.findAllActive();
    }

    @Override
    public User getUser(int id) {
	return userDAO.getUser(id);
    }

    @Override
    public User getUser(String username) {
	return userDAO.findByName(username);
    }

    @Override
    public User getUserByEmailAndStatus(String email, UserStatus userStatus) {
	return userDAO.findByEmailAndStatus(email, userStatus);
    }

    @Override
    public User saveUser(User user) {
	if (user == null) {
	    return null;
	}
	boolean isInsert = user.getId() < 1;
	user = entityManager.merge(user);
	if (isInsert) {
	    entityManager.merge(new Album(AlbumService.ALBUM_UPLOADS, user));
	    entityManager.merge(new Album(AlbumService.ALBUM_PROFILE, user));
	}
	return user;
    }

    @Override
    public User signupUser(String username, String email, String password, String displayName)
	    throws UsernameInUseException, UserNotInvitedException {
	User user = new User();

	if (getUser(username) != null) {
	    throw new UsernameInUseException();
	}

	if (invitationOnlySignup) {
	    user = getUserByEmailAndStatus(email, UserStatus.INVITED);
	    if (user == null) {
		throw new UserNotInvitedException();
	    }
	}
	user.setUsername(username);
	user.setPassword(passwordEncoder.encode(password));
	user.setEmail(email);
	user.setDisplayName(displayName);
	user.setStatus(UserStatus.ACTIVE);
	user = saveUser(user);
	return user;
    }
    
    @Override
    public boolean inviteUser(User user, String email) {
	
	User alreadyActive = getUserByEmailAndStatus(email, UserStatus.ACTIVE);
	if (alreadyActive != null) {
	    return false;
	}
	
	User invitedUser = getUserByEmailAndStatus(email, UserStatus.INVITED);
	
	if (invitedUser == null) {
	    invitedUser = new User();
	    invitedUser.setStatus(UserStatus.INVITED);
	} else if (invitationDAO.invitationExists(user, invitedUser)) {
	    return false;
	}
	invitedUser.setEmail(email);
	invitedUser = saveUser(invitedUser);
	
	Invitation invitation = new Invitation(user, invitedUser, new Date());
	entityManager.merge(invitation);
	return true;
    }

}
