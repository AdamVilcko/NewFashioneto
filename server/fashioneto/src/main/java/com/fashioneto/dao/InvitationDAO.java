/**
 * 
 */
package com.fashioneto.dao;

import com.fashioneto.persistence.User;

/**
 * @author felipe
 *
 */
public interface InvitationDAO {

    public boolean invitationExists(User user, User invitedUser);

}
