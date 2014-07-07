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

	public static final String PARENT_TYPE_FILTER = "parentTypeFilter";
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private int id;

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "id_user")
	private User user;

	@OneToMany(cascade = { CascadeType.ALL }, fetch = FetchType.EAGER)
	@JoinTable(name = "comment_parent", joinColumns = @JoinColumn(name = "id_parent_image"), inverseJoinColumns = @JoinColumn(name = "id_comment"))
	@OrderBy("date desc")
	private Set<Comment> receivedComments = new LinkedHashSet<Comment>();

	@OneToMany(mappedBy = "image", cascade = { CascadeType.ALL }, fetch = FetchType.EAGER)
	private Set<LikeImage> likes = new LinkedHashSet<LikeImage>();

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
		if (likes == null)
		{
			return 0;
		}
		return likes.size();
	}

	public Set<LikeImage> getLikes()
	{
		return likes;
	}

	public void setLikes(Set<LikeImage> likes)
	{
		this.likes = likes;
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

	public Set<Comment> getReceivedComments()
	{
		return receivedComments;
	}

	public void setReceivedComments(Set<Comment> receivedComments)
	{
		this.receivedComments = receivedComments;
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

}
