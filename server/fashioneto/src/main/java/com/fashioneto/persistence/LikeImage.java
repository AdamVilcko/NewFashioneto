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
@Table(name = "like_image")
public class LikeImage implements Serializable
{

	private static final long serialVersionUID = 1L;
	public static final String FIELD_NAME_USER_ID = "id_user";
	public static final String FIELD_NAME_IMAGE_ID = "id_image";

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private int id;

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
	@JoinColumn(name = FIELD_NAME_USER_ID)
	private User user;

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
	@JoinColumn(name = FIELD_NAME_IMAGE_ID)
	private Image image;

	public LikeImage()
	{

	}

	public LikeImage(User user, Image image)
	{
		super();
		this.user = user;
		this.image = image;
	}

	@Override
	public boolean equals(Object obj)
	{
		if (user != null && image != null && obj instanceof LikeImage)
		{
			User objUser = ((LikeImage) obj).getUser();
			Image objImage = ((LikeImage) obj).getImage();
			return objUser != null && objImage != null && user.getId() == objUser.getId()
					&& image.getId() == objImage.getId();
		}
		return false;
	}

	@Override
	public int hashCode()
	{
		if (user == null || image == null)
		{
			return super.hashCode();
		}
		return user.getId() + image.getId();
	}

	@Override
	public String toString()
	{
		if (user == null || image == null)
		{
			return "LikeComment [id=" + id + ", user=null, comment=null]";
		}
		return "LikeComment [id=" + id + ", user=" + user.getId() + ", comment=" + image.getId() + "]";
	}

	public User getUser()
	{
		return user;
	}

	public void setUser(User user)
	{
		this.user = user;
	}

	public void setId(int id)
	{
		this.id = id;
	}

	public Image getImage()
	{
		return image;
	}

	public void setImage(Image image)
	{
		this.image = image;
	}

	public int getId()
	{
		return id;
	}

}
