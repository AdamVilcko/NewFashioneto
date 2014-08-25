package com.fashioneto.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Random;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.codec.Hex;
import org.springframework.util.StringUtils;

import com.fashioneto.persistence.User;

public class TokenUtils
{

	public static final String MAGIC_KEY = "obfuscate";

	/* Expires in TWENTY hours */
	public static final Long MINUTES_TO_EXPIRE = 20 * 60L;

	public static String createTokenImageName(UserDetails userDetails)
	{

		long time = System.currentTimeMillis();

		Random randomNumber = new Random(9999); 
		
		StringBuilder tokenBuilder = new StringBuilder();
		tokenBuilder.append(userDetails.getUsername());
		tokenBuilder.append("-");
		tokenBuilder.append(time + randomNumber.nextLong());
		tokenBuilder.append("-");
		tokenBuilder.append(TokenUtils.computeSignature(userDetails, time));

		MessageDigest digest = getMd5Digest();

		return new String(Hex.encode(digest.digest(tokenBuilder.toString().getBytes())));
	}
	
	public static String createToken(String username, String password) {
	    User user = new User();
	    user.setUsername(username);
	    user.setPassword(password);
	    return createToken(user);
	}

	public static String createToken(UserDetails userDetails)
	{

		long expires = System.currentTimeMillis() + 1000L * 60 * MINUTES_TO_EXPIRE;

		StringBuilder tokenBuilder = new StringBuilder();
		tokenBuilder.append(userDetails.getUsername());
		tokenBuilder.append(":");
		tokenBuilder.append(expires);
		tokenBuilder.append(":");
		tokenBuilder.append(TokenUtils.computeSignature(userDetails, expires));

		return tokenBuilder.toString();
	}

	public static String computeSignature(UserDetails userDetails, long expires)
	{

		StringBuilder signatureBuilder = new StringBuilder();
		signatureBuilder.append(userDetails.getUsername());
		signatureBuilder.append(":");
		signatureBuilder.append(expires);
		signatureBuilder.append(":");
		signatureBuilder.append(userDetails.getPassword());
		signatureBuilder.append(":");
		signatureBuilder.append(TokenUtils.MAGIC_KEY);

		MessageDigest digest = getMd5Digest();

		return new String(Hex.encode(digest.digest(signatureBuilder.toString().getBytes())));
	}

	private static MessageDigest getMd5Digest()
	{
		MessageDigest digest;
		try
		{
			digest = MessageDigest.getInstance("MD5");
		}
		catch (NoSuchAlgorithmException e)
		{
			throw new IllegalStateException("No MD5 algorithm available!");
		}
		return digest;
	}

	public static String getUserNameFromToken(String authToken)
	{

		if (null == authToken || StringUtils.isEmpty(authToken))
		{
			return null;
		}

		String[] parts = authToken.split(":");
		return parts[0];
	}

	public static boolean validateToken(String authToken, UserDetails userDetails)
	{

		String[] parts = authToken.split(":");
		long expires = Long.parseLong(parts[1]);
		String signature = parts[2];

		if (expires < System.currentTimeMillis())
		{
			return false;
		}

		return signature.equals(TokenUtils.computeSignature(userDetails, expires));
	}
}
