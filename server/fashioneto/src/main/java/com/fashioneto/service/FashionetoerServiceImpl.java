/*
 * Copyright Telrock Communications Limited 2008 * 
 *
 * $Header:  $
 * $Revision:  $
 * $Date:  $ 
 * 
 */
package com.fashioneto.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import net.sourceforge.stripes.integration.spring.SpringBean;

import com.fashioneto.dao.FashionetoerDAO;
import com.fashioneto.persistence.Fashionetoer;

public class FashionetoerServiceImpl implements FashionetoerService
{
	@PersistenceContext
	private EntityManager entityManager;

	@SpringBean
	private FashionetoerDAO fashionetoerDAO;

	@Override
	public List<Fashionetoer> getFashionetoers()
	{
		return null;
	}

	@Override
	public Fashionetoer getFashionetoer(int id)
	{
		return entityManager.find(Fashionetoer.class, id);
	}

}
