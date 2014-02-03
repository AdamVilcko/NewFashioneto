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

import org.springframework.stereotype.Service;

import com.fashioneto.persistence.Fashionetoer;

@Service("fashionetoerService")
public class FashionetoerServiceImpl implements FashionetoerService
{
	@PersistenceContext
	private EntityManager entityManager;

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
