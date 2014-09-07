package com.fashioneto.persistence;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * @author Felipe Tonon 16 Mar 2014
 **/
@Entity
@Table(name = "like_comment")
public class LikeComment implements Serializable {

    private static final long serialVersionUID = 1L;
    public static final String FIELD_NAME_USER_ID = "id_user";
    public static final String FIELD_NAME_COMMENT_ID = "id_comment";

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinColumn(name = FIELD_NAME_USER_ID)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinColumn(name = FIELD_NAME_COMMENT_ID)
    private Comment comment;

    public LikeComment() {

    }

    public LikeComment(User user, Comment comment) {
	super();
	this.user = user;
	this.comment = comment;
    }

    @Override
    public boolean equals(Object obj) {
	if (user != null && comment != null && obj instanceof LikeComment) {
	    User objUser = ((LikeComment) obj).getUser();
	    Comment objComment = ((LikeComment) obj).getComment();
	    return objUser != null && objComment != null && user.getId() == objUser.getId()
		    && comment.getId() == objComment.getId();
	}
	return false;
    }

    @Override
    public int hashCode() {
	if (user == null || comment == null) {
	    return super.hashCode();
	}
	return user.getId() + comment.getId();
    }

    @Override
    public String toString() {
	if (user == null || comment == null) {
	    return "LikeComment [id=" + id + ", user=null, comment=null]";
	}
	return "LikeComment [id=" + id + ", user=" + user.getId() + ", comment=" + comment.getId() + "]";
    }

    public User getUser() {
	return user;
    }

    public void setUser(User user) {
	this.user = user;
    }

    public Comment getComment() {
	return comment;
    }

    public void setComment(Comment comment) {
	this.comment = comment;
    }

    public int getId() {
	return id;
    }

    public void setId(int id) {
	this.id = id;
    }

}
