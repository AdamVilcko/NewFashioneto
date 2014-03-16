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

import org.hibernate.annotations.FilterDef;

/**
 * @author Felipe Tonon 5 Feb 2014
 **/
@Entity
@Table(name = "comment")
@FilterDef(name = Comment.PARENT_TYPE_FILTER)
public class Comment implements Serializable
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

	@Column(name = "content")
	private String content;

	@Column(name = "dt_comment")
	private Date date;

	//	@Enumerated(EnumType.STRING)
	//	private CommentParentTypeEnum parentType;

	@OneToMany(cascade = { CascadeType.ALL }, fetch = FetchType.EAGER)
	@JoinTable(name = "comment_parent", joinColumns = @JoinColumn(name = "id_parent_comment"), inverseJoinColumns = @JoinColumn(name = "id_comment"))
	@OrderBy("date desc")
	private Set<Comment> comments = new LinkedHashSet<Comment>();

	@OneToMany(mappedBy = "comment", cascade = { CascadeType.ALL }, fetch = FetchType.EAGER)
	private Set<LikeComment> likes = new LinkedHashSet<LikeComment>();

	public Comment()
	{

	}

	public Comment(int id)
	{
		this.id = id;
	}

	public int getNumberOfLikes()
	{
		if (likes == null)
		{
			return 0;
		}
		return likes.size();
	}

	public String getDateInTimestampString()
	{
		return Long.toString(date.getTime() / 1000);
	}

	public CommentSet getCommentsCommentSet()
	{
		return new CommentSet(comments);
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
		//		return "Comment [id=" + id + ", user=" + user.getId() + ", content=" + content + "]";
		return "Comment [id=" + id + ", content=" + content + "]";
	}

	public Set<Comment> getComments()
	{
		return comments;
	}

	public void setComments(Set<Comment> comments)
	{
		this.comments = comments;
	}

	public Date getDate()
	{
		return date;
	}

	public void setDate(Date date)
	{
		this.date = date;
	}

	public Set<LikeComment> getLikes()
	{
		return likes;
	}

	public void setLikes(Set<LikeComment> likes)
	{
		this.likes = likes;
	}

}
