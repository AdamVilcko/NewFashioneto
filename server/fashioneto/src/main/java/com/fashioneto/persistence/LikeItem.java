/**
 * 
 */
package com.fashioneto.persistence;

import java.io.Serializable;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

/**
 * @author FTonon
 *
 */
@Entity
@Table(name = "like_item")
@PrimaryKeyJoinColumn(name = "id_feed")
@AttributeOverrides({
    @AttributeOverride(name="id", column=@Column(name="id_feed")),
    @AttributeOverride(name="user", column=@Column(name="id_user")),
    @AttributeOverride(name="date", column=@Column(name="date")),
    @AttributeOverride(name="type", column=@Column(name="type"))
})
public class LikeItem extends Feed implements Serializable {

    /**
     * 
     */
    private static final long serialVersionUID = 1L;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinColumn(name = "id_item")
    private Item item;

    public LikeItem() {
	this.setType(FeedType.LIKE_ITEM);
    }

    public LikeItem(User user, Item item) {
	super(user);
	this.setType(FeedType.LIKE_ITEM);
	this.item = item;
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

    public User getUser() {
	return this.user;
    }

    public Item getItem() {
	return item;
    }

    public void setItem(Item item) {
	this.item = item;
    }

}
