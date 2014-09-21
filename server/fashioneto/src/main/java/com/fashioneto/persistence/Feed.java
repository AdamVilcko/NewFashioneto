/**
 * 
 */
package com.fashioneto.persistence;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
@Table(name = "feed")
public class Feed implements Serializable {

    private static final long serialVersionUID = 2521377671219075377L;

    @Id
    @GeneratedValue
    @Column(name = "id")
    protected int id;
    
    @Column(name = "date")
    protected Date date;
    
    @Enumerated(EnumType.STRING)
    protected FeedType type;
    
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_user")
    protected User user; 
    
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_like_item")
    protected LikeItem likeItem;    
    
    public Feed() {
	
    }
    
    
    public Feed(User user, FeedType type) {
	this.user = user;
	this.type = type;
    }
    
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public FeedType getType() {
        return type;
    }

    public void setType(FeedType type) {
        this.type = type;
    }


    public User getUser() {
        return user;
    }


    public void setUser(User user) {
        this.user = user;
    }


    public LikeItem getLikeItem() {
        return likeItem;
    }


    public void setLikeItem(LikeItem likeItem) {
        this.likeItem = likeItem;
    }

    
}
