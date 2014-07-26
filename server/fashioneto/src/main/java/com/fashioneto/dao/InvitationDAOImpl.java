/**
 * 
 */
package com.fashioneto.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fashioneto.persistence.Invitation;
import com.fashioneto.persistence.User;

/**
 * @author felipe
 *
 */
@Transactional
@Service("invitationDAO")
public class InvitationDAOImpl implements InvitationDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public boolean invitationExists(User user, User invitedUser) {

	TypedQuery<Invitation> query = entityManager.createQuery("from Invitation where user.id=:userId and invitedUser.id=:invitedUserId", Invitation.class);
	query.setParameter("userId", user.getId());
	query.setParameter("invitedUserId", invitedUser.getId());

	return query.getResultList().size() > 0;
    }

}
