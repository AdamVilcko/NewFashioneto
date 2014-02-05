/**
create table commentary (
	`id` int(11) unsigned AUTO_INCREMENT not null primary key,
	`id_fashionetoer` int(11) unsigned not null,
	`id_image` int(11) unsigned not null,
	`id_parent` int(11) unsigned not null,
	`type_parent` varchar(50) not null
);
 */
package com.fashioneto.persistence;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * @author Felipe Tonon 5 Feb 2014
 **/
@Entity
@Table(name = "commentary")
@Inheritance
@DiscriminatorColumn(name = "parent_type", discriminatorType = DiscriminatorType.STRING)
public abstract class AbstractComment implements Serializable
{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private int id;

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "id_fashionetoer")
	private User user;

	@Column(name = "content")
	private String content;

	@Enumerated(EnumType.STRING)
	private EnumCommentParentType parentType;

	@OneToMany(mappedBy = "parent", cascade = { CascadeType.ALL }, fetch = FetchType.LAZY)
	private List<CommentComment> commentList = new ArrayList<CommentComment>();

	public List<CommentComment> getCommentList()
	{
		return commentList;
	}

	public void setCommentList(List<CommentComment> commentList)
	{
		this.commentList = commentList;
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

	public String getContent()
	{
		return content;
	}

	public void setContent(String content)
	{
		this.content = content;
	}

	public EnumCommentParentType getParentType()
	{
		return parentType;
	}

	public void setParentType(EnumCommentParentType parentType)
	{
		this.parentType = parentType;
	}

}
