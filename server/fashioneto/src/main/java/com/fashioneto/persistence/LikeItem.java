/**
 * 
 */
package com.fashioneto.persistence;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 * @author FTonon
 *
 */
@Entity
@Table(name = "like_item")
public class LikeItem implements Serializable {

    private static final long serialVersionUID = -6101384511413246548L;
    
    @Id
    @GeneratedValue
    @Column(name = "id")
    protected int id;
    
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinColumn(name = "id_item")
    private Item item;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_user")
    protected User user;    

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_feed")
    protected Feed feed;  
    
    public LikeItem() {
	
    }

    public LikeItem(User user, Item item) {
	this();
	this.item = item;
	this.user = user;
    }

    @Override
    public int hashCode() {
	
	if (getItem() == null || getUser() == null) {
	    return 0;
	}
	
	return getItem().getId() / getUser().getId() ;
    }

    
    @Override
    public boolean equals(Object obj) {

	if (obj instanceof LikeItem) {
	    LikeItem likeItem = (LikeItem) obj;

	    boolean valuesNotNull = (this.getUser() != null) && (likeItem.getUser() != null)
		    && (this.getItem() != null) && (likeItem.getItem() != null);

	    return valuesNotNull && this.getUser().getId() == likeItem.getUser().getId()
		    && this.getItem().getId() == likeItem.getItem().getId();
	}

	return false;
    }
    
    public Item getItem() {
	return item;
    }

    public void setItem(Item item) {
	this.item = item;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
	return "LikeItem [item=" + item + ", user=" + user + ", id=" + id + "]";
    }

    public Feed getFeed() {
        return feed;
    }

    public void setFeed(Feed feed) {
        this.feed = feed;
    }

}
