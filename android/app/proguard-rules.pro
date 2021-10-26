# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# react-native-reanimated
-keep class com.facebook.react.turbomodule.** { *; }

# naver login
-keep public class com.nhn.android.naverlogin.** {
       public protected *;
}

# 릴리즈 버전에서 카카오 소셜 로그인 crash 발생하여 추가함 (2021.08.26)
-keep class com.kakao.sdk.**.model.* { <fields>; }