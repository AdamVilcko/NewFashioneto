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
public class Item implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "indexing_date")
    private Date indexingDate;

    @OneToMany(mappedBy = "item", cascade = { CascadeType.ALL }, fetch = FetchType.EAGER)
    private Set<LikeItem> likes = new LinkedHashSet<LikeItem>();

    @OneToMany(cascade = { CascadeType.ALL }, fetch = FetchType.EAGER)
    @JoinTable(name = "comment_parent", joinColumns = @JoinColumn(name = "id_parent_item"), inverseJoinColumns = @JoinColumn(name = "id_comment"))
    @OrderBy("date desc")
    private Set<Comment> comments = new LinkedHashSet<Comment>();

    public Item() {

    }

    public Item(int id) {
	this.id = id;
    }

    public Item(int id, Date indexingDate) {
	this.id = id;
	this.indexingDate = indexingDate;
    }

    public void addLiker(User user) {
	LikeItem likeItem = new LikeItem(user, this);
	if (!likes.contains(likeItem)) {
	    likes.add(likeItem);
	}
    }

    public void removeLiker(User user) {
	LikeItem likeItem = new LikeItem(user, this);
	if (likes.contains(likeItem)) {
	    likes.remove(likeItem);
	}
    }

    @Override
    public String toString() {
	return "Item [id=" + id + ", indexingDate=" + indexingDate + "]";
    }

    public int getId() {
	return id;
    }

    public void setId(int id) {
	this.id = id;
    }

    public Set<Comment> getComments() {
	return comments;
    }

    public void setComments(Set<Comment> comments) {
	this.comments = comments;
    }

    public Date getIndexingDate() {
        return indexingDate;
    }

    public void setIndexingDate(Date indexingDate) {
        this.indexingDate = indexingDate;
    }

    public Set<LikeItem> getLikes() {
        return likes;
    }

    public void setLikes(Set<LikeItem> likes) {
        this.likes = likes;
    }
}
