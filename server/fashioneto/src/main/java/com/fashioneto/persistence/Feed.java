/**
 * 
 */
package com.fashioneto.persistence;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;

/**
 * @author FTonon
 *
 */
@Entity
@Table(name = "feed")
@Inheritance(strategy=InheritanceType.JOINED)
public class Feed implements Serializable {

    private static final long serialVersionUID = 2521377671219075377L;

    @Id
    @GeneratedValue
    @Column(name = "id_feed")
    protected int id;
    
    @Column(name = "date")
    protected Date date;
    
    @Enumerated(EnumType.STRING)
    protected FeedType type;
    
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

    
}
