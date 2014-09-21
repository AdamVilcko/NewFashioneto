/**
 * 
 */
package com.fashioneto.utils;

import java.util.Date;

/**
 * @author felipe
 *
 */
public class DateUtils {
    public static String getDateInTimestampString(Date date) {
	return Long.toString(date.getTime() / 1000);
    }
}
