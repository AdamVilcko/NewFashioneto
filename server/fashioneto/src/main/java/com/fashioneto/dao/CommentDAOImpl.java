package com.fashioneto.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fashioneto.persistence.Comment;
import com.fashioneto.persistence.CommentParentTypeEnum;
import com.fashioneto.persistence.LikeComment;

/**
 * @author Felipe Tonon 16 Mar 2014
 **/
@Transactional
@Service("commentDAO")
public class CommentDAOImpl implements CommentDAO
{
	private static final String FIELD_ID_PARENT_COMMENT = "id_parent_comment";
	private static final String FIELD_ID_PARENT_USER = "id_parent_user";
	private static final String FIELD_ID_PARENT_IMAGE = "id_parent_image";

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public int getNumberOfLikes(int commentId)
	{
		TypedQuery<Long> query = entityManager.createQuery(
				"SELECT COUNT(lc) from LikeComment lc where comment.id=:commentId ", Long.class);
		query.setParameter("commentId", commentId);
		return query.getSingleResult().intValue();
	}

	@Override
	public Comment save(Comment comment)
	{
		return entityManager.merge(comment);
	}

	@Override
	public LikeComment save(LikeComment likeComment)
	{
		return entityManager.merge(likeComment);
	}

	@Override
	public Comment saveNew(CommentParentTypeEnum parentType, int parentId, Comment comment)
	{
		Comment savedComment = save(comment);
		saveCommentParent(parentType, parentId, savedComment);
		//		entityManager.refresh(comment);
		return savedComment;
	}

	/**
	 * @param parentType
	 * @param parentId
	 * @param comment
	 * @return Number of affected rows;
	 */
	private int saveCommentParent(CommentParentTypeEnum parentType, int parentId, Comment comment)
	{
		String sql = "INSERT INTO comment_parent (id_comment, " + getParentFieldName(parentType)
				+ ", parent_type) values (:idComment, :parentId, :parentType);";
		Query query = entityManager.createNativeQuery(sql);
		query.setParameter("idComment", comment.getId());
		query.setParameter("parentId", parentId);
		query.setParameter("parentType", parentType.toString());
		return query.executeUpdate();

	}

	private String getParentFieldName(CommentParentTypeEnum parentType)
	{
		switch (parentType)
		{
			case COMMENT:
				return FIELD_ID_PARENT_COMMENT;
			case ITEM:
				// return FIELD_ID_PARENT_ITEM;
				break;
			case IMAGE:
				return FIELD_ID_PARENT_IMAGE;
			case USER:
				return FIELD_ID_PARENT_USER;
			default:
				break;
		}
		return FIELD_ID_PARENT_USER;

	}
}
