package com.fashioneto.persistence;

import java.io.Serializable;
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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;

/**
 * @author Felipe Tonon 8 Jul 2014
 **/

@Entity
@Table(name = "album")
public class Album implements Serializable
{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private int id;

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "id_user")
	private User user;

	@OneToMany(mappedBy = "album", cascade = { CascadeType.ALL }, fetch = FetchType.EAGER)
	@OrderBy("date desc")
	private Set<Image> images = new LinkedHashSet<Image>();

	@Column(name = "name")
	private String name;

	public Album()
	{

	}

	public Album(int id)
	{
		this.id = id;
	}

	public Album(String name, User user)
	{
		this.name = name;
		this.user = user;
	}

	public int getId()
	{
		return id;
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

	public Set<Image> getImages()
	{
		return images;
	}

	public void setImages(Set<Image> images)
	{
		this.images = images;
	}

	public String getName()
	{
		return name;
	}

	public void setName(String name)
	{
		this.name = name;
	}

	@Override
	public String toString()
	{
		return "Album [id=" + id + ", user=" + user + ", name=" + name + "]";
	}

	@Override
	public int hashCode()
	{
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((user == null) ? 0 : user.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj)
	{
		if (obj == null)
		{
			return false;
		}
		return (obj instanceof Album) && (((Album) obj).getId() == id);
	}
}
