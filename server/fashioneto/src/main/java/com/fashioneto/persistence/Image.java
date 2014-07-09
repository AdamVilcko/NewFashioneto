/**
 * 
 */
package com.fashioneto.persistence;

import java.io.Serializable;
import java.util.Date;
import java.util.LinkedHashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;

/**
 * @author felipe
 */
@Entity
@Table(name = "image")
public class Image implements Serializable
{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private int id;

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "id_user")
	private User user;

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
	@JoinColumn(name = "id_album")
	private Album album;

	@OneToMany(cascade = { CascadeType.ALL }, fetch = FetchType.EAGER)
	@JoinTable(name = "comment_parent", joinColumns = @JoinColumn(name = "id_parent_image"), inverseJoinColumns = @JoinColumn(name = "id_comment"))
	@OrderBy("date desc")
	private Set<Comment> comments = new LinkedHashSet<Comment>();

	@ManyToMany(cascade = { CascadeType.PERSIST }, fetch = FetchType.EAGER)
	@JoinTable(name = "like_image", joinColumns = @JoinColumn(name = "id_image"), inverseJoinColumns = @JoinColumn(name = "id_user"))
	private Set<User> likedBy = new LinkedHashSet<User>();

	@Column(name = "description")
	private String description;

	@Column(name = "filename")
	private String filename;

	@Column(name = "file_extension")
	private String fileExtension;

	@Column(name = "date")
	private Date date;

	public int getNumberOfLikes()
	{
		if (likedBy == null)
		{
			return 0;
		}
		return likedBy.size();
	}

	public String getFullFilename()
	{
		return getFullFilename("");
	}

	public String getFullFilename(String sufix)
	{
		return filename + sufix + "." + fileExtension;
	}

	public int getId()
	{
		return id;
	}

	@Override
	public String toString()
	{
		return "Image [id=" + id + ", description=" + description + ", filename=" + filename + ", fileExtension="
				+ fileExtension + ", date=" + date + "]";
	}

	public void setId(int id)
	{
		this.id = id;
	}

	public User getUser()
	{
		return user;
	}

	public void setUser(User user)
	{
		this.user = user;
	}

	public String getDescription()
	{
		return description;
	}

	public void setDescription(String description)
	{
		this.description = description;
	}

	public String getFilename()
	{
		return filename;
	}

	public void setFilename(String filename)
	{
		this.filename = filename;
	}

	public Date getDate()
	{
		return date;
	}

	public void setDate(Date date)
	{
		this.date = date;
	}

	public String getFileExtension()
	{
		return fileExtension;
	}

	public void setFileExtension(String fileExtension)
	{
		this.fileExtension = fileExtension;
	}

	public Set<User> getLikedBy()
	{
		return likedBy;
	}

	public void setLikedBy(Set<User> likedBy)
	{
		this.likedBy = likedBy;
	}

	public void addLiker(User user)
	{
		if (!likedBy.contains(user))
		{
			likedBy.add(user);
		}
	}

	public void removeLiker(User user)
	{
		if (likedBy.contains(user))
		{
			likedBy.remove(user);
		}
	}

	public Set<Comment> getComments()
	{
		return comments;
	}

	public void setComments(Set<Comment> comments)
	{
		this.comments = comments;
	}

	public Album getAlbum()
	{
		return album;
	}

	public void setAlbum(Album album)
	{
		this.album = album;
	}

	@Override
	public int hashCode()
	{
		final int prime = 31;
		int result = 1;
//		result = prime * result + ((album == null) ? 0 : album.hashCode());
		result = prime * result + ((date == null) ? 0 : date.hashCode());
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + ((fileExtension == null) ? 0 : fileExtension.hashCode());
		result = prime * result + ((filename == null) ? 0 : filename.hashCode());
		result = prime * result + id;
		result = prime * result + ((user == null) ? 0 : user.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj)
	{
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Image other = (Image) obj;
		if (album == null)
		{
			if (other.album != null)
				return false;
		}
		else if (!album.equals(other.album))
			return false;
		if (date == null)
		{
			if (other.date != null)
				return false;
		}
		else if (!date.equals(other.date))
			return false;
		if (description == null)
		{
			if (other.description != null)
				return false;
		}
		else if (!description.equals(other.description))
			return false;
		if (fileExtension == null)
		{
			if (other.fileExtension != null)
				return false;
		}
		else if (!fileExtension.equals(other.fileExtension))
			return false;
		if (filename == null)
		{
			if (other.filename != null)
				return false;
		}
		else if (!filename.equals(other.filename))
			return false;
		if (id != other.id)
			return false;
		if (user == null)
		{
			if (other.user != null)
				return false;
		}
		else if (!user.equals(other.user))
			return false;
		return true;
	}

}
