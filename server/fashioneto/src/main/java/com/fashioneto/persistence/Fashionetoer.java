/**
 * 
 */
package com.fashioneto.persistence;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * @author Felipe
 */
@Entity
@Table(name = "fashionetoer")
public class Fashionetoer implements Serializable
{

	private static final long serialVersionUID = 1L;

	private int id;
	private String username;
	private String email;

	public Fashionetoer(int id, String username, String email)
	{
		this.id = id;
		this.username = username;
		this.email = email;
	}

	public int getId()
	{
		return id;
	}

	public void setId(int id)
	{
		this.id = id;
	}

	public String getUsername()
	{
		return username;
	}

	public void setUsername(String username)
	{
		this.username = username;
	}

	public String getEmail()
	{
		return email;
	}

	public void setEmail(String email)
	{
		this.email = email;
	}

}
