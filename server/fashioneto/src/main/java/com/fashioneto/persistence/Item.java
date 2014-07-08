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
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;

/**
 * @author Felipe
 */
@Entity
@Table(name = "item")
public class Item implements Serializable
{

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "id")
	private int id;

	@Column(name = "indexing_date")
	private Date indexingDate;

	@ManyToMany(cascade = { CascadeType.PERSIST }, fetch = FetchType.EAGER)
	@JoinTable(name = "like_item", joinColumns = @JoinColumn(name = "id_item"), inverseJoinColumns = @JoinColumn(name = "id_user"))
	private Set<User> likedBy = new LinkedHashSet<User>();

	@OneToMany(cascade = { CascadeType.ALL }, fetch = FetchType.EAGER)
	@JoinTable(name = "comment_parent", joinColumns = @JoinColumn(name = "id_parent_item"), inverseJoinColumns = @JoinColumn(name = "id_comment"))
	@OrderBy("date desc")
	private Set<Comment> comments = new LinkedHashSet<Comment>();

	public Item()
	{

	}

	public Item(int id)
	{
		this.id = id;
	}

	public Item(int id, Date indexingDate)
	{
		this.id = id;
		this.indexingDate = indexingDate;
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

	@Override
	public String toString()
	{
		return "Item [id=" + id + ", indexingDate=" + indexingDate + "]";
	}

	public int getId()
	{
		return id;
	}

	public void setId(int id)
	{
		this.id = id;
	}

	public Set<User> getLikedBy()
	{
		return likedBy;
	}

	public void setLikedBy(Set<User> likedBy)
	{
		this.likedBy = likedBy;
	}

	public Set<Comment> getComments()
	{
		return comments;
	}

	public void setComments(Set<Comment> comments)
	{
		this.comments = comments;
	}
}
