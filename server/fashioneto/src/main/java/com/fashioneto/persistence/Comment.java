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
import javax.persistence.Table;

import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.FilterJoinTable;

/**
 * @author Felipe Tonon 5 Feb 2014
 **/
@Entity
@Table(name = "comment")
@FilterDef(name = Comment.PARENT_TYPE_FILTER)
public class Comment implements Serializable
{

	public static final String PARENT_TYPE_FILTER = "parentTypeFilter";
	//TODO: continue here

	//http://www.nvenky.in/2010/07/hibernate-onetomany-annotation-filter.html
	//http://docs.jboss.org/hibernate/orm/3.6/reference/en-US/html/filters.html
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

	//	@Enumerated(EnumType.STRING)
	//	private CommentParentTypeEnum parentType;

	@OneToMany(cascade = { CascadeType.ALL }, fetch = FetchType.EAGER)
	@JoinTable(name = "comment_parent", joinColumns = @JoinColumn(name = "id_parent"), inverseJoinColumns = @JoinColumn(name = "id_comment"))
	@FilterJoinTable(name = PARENT_TYPE_FILTER, condition = "parent_type == COMMENT")
	//	@OrderBy("date desc")
	private Set<Comment> comments = new LinkedHashSet<Comment>();

	public Set<Comment> getCommentList()
	{
		return comments;
	}

	public void setCommentList(Set<Comment> commentList)
	{
		this.comments = commentList;
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

	@Override
	public String toString()
	{
		return "Comment [id=" + id + ", content=" + content + "]";
	}

}
