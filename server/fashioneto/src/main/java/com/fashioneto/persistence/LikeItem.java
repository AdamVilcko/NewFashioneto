/**
 * 
 */
package com.fashioneto.persistence;

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
public class LikeItem implements Feedable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    @Column(name = "id")
    protected int id;
    
    @GeneratedValue
    @OneToOne(mappedBy = "Feedable", fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    protected Feed feed;   
    
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinColumn(name = "id_item")
    private Item item;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_user")
    protected User user;    
    
    public LikeItem() {
	
    }

    public LikeItem(User user, Item item) {
	this.item = item;
    }

    @Override
    public int hashCode() {
	return getId();
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

}
