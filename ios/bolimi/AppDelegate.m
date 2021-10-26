#import "AppDelegate.h"

#import <Firebase.h>
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLinkingManager.h>
#import <RNKakaoLogins.h>
#import <NaverThirdPartyLogin/NaverThirdPartyLoginConnection.h>
#import <CodePush/CodePush.h>
#import <FIRDynamicLink.h>
#import <RNFBDynamicLinksAppDelegateInterceptor.h>

#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>

static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
#ifdef FB_SONARKIT_ENABLED
  InitializeFlipper(application);
#endif

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"bolimi"
                                            initialProperties:nil];

  if (@available(iOS 13.0, *)) {
      rootView.backgroundColor = [UIColor systemBackgroundColor];
  } else {
      rootView.backgroundColor = [UIColor whiteColor];
  }

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  // naver login
  [[NaverThirdPartyLoginConnection getSharedInstance] setIsInAppOauthEnable:YES];
  
  // firebase message
  [FIRApp configure];
  
  return YES;
}

- (BOOL)application:(UIApplication *)app
     openURL:(NSURL *)url
     options:(NSDictionary<NSString *,id> *)options {
  
  NSLog(@"\n\n\n  !!!!!!!!!!!!!!!!!!!!!두번째!!!!!!!!!!!!!!!!!!!!!!!! :: %@   \n\n\n !!!!!!!!!!!!!!!!!!!!!url !!!!!!!!!!!!!!!!!!!!! :: %@", url.scheme,url);
  // firebase dynamic link interceptor
  RNFBDynamicLinksAppDelegateInterceptor *interceptor = [RNFBDynamicLinksAppDelegateInterceptor sharedInstance];
  FIRDynamicLink *dynamicLink = [[FIRDynamicLinks dynamicLinks] dynamicLinkFromCustomSchemeURL:url];
  if (dynamicLink.url)
  {
    interceptor.initialLinkUrl = dynamicLink.url.absoluteString;
    interceptor.initialLinkMinimumAppVersion = dynamicLink.minimumAppVersion == nil ? [NSNull null] : dynamicLink.minimumAppVersion;
  }
  
  if ([RNKakaoLogins isKakaoTalkLoginUrl:url]) {
    return [RNKakaoLogins handleOpenUrl: url];
  }

  if ([RCTLinkingManager application:app openURL:url options:options]) {
    return YES;
  }
  
  if ([url.scheme isEqualToString:@"kr.bolimi"]) {
    return [[NaverThirdPartyLoginConnection getSharedInstance] application:app openURL:url options:options];
  }

  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [CodePush bundleURL];
#endif
}

@end
