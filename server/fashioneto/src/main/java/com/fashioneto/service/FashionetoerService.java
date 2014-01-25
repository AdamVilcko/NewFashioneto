/**
 * 
 */
package com.fashioneto.service;

import java.util.List;

import com.fashioneto.persistence.Fashionetoer;

/**
 * @author Felipe
 */
public interface FashionetoerService
{

	public List<Fashionetoer> getFashionetoers();

	public Fashionetoer getFashionetoer(int id);

}
