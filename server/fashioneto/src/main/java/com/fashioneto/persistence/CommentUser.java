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

import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

/**
 * @author Felipe Tonon 5 Feb 2014
 **/
@Entity
@DiscriminatorValue(CommentUser.PARENT_TYPE_USER)
public class CommentUser extends AbstractComment
{

	private static final long serialVersionUID = 1L;

	public static final String PARENT_TYPE_USER = "USER";

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "id_parent")
	private User parent;

	public User getParent()
	{
		return parent;
	}

	public void setParent(User parent)
	{
		this.parent = parent;
	}

}
