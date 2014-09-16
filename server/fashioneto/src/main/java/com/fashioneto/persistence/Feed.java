/**
 * 
 */
package com.fashioneto.persistence;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 * @author FTonon
 *
 */
//@Entity
@Table(name = "feed")
//@Inheritance(strategy=InheritanceType.TABLE_PER_CLASS)
@Inheritance(strategy=InheritanceType.JOINED)
@MappedSuperclass
public class Feed {

    @Id
    @GeneratedValue
    @Column(name = "id_feed")
    protected int id;
    
    @Column(name = "date")
    protected Date date;
    
    @Enumerated(EnumType.STRING)
    protected FeedType type;
    
    @OneToOne(mappedBy = "feed", cascade = { CascadeType.ALL }, fetch = FetchType.EAGER)
    protected Feedable feedable;

    public Feed() {
	
    }
    
    public Feed(User user) {
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

    public Feedable getFeedable() {
        return feedable;
    }

    public void setFeedable(Feedable feedable) {
        this.feedable = feedable;
    }

    
    
    
    
    
}
