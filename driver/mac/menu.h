#ifndef __INC_DRIVER_MENU_H__
#define __INC_DRIVER_MENU_H__

#import <Cocoa/Cocoa.h>

@interface Menu : NSObject <NSMenuDelegate>
@property NSMenu *pMenu;
@property NSString *ID;

+ (void)initEventHandlers;
- (instancetype)initWithID:(NSString *)menuId;
- (BOOL)populateWithDiffset:(NSDictionary *)diffset;
- (void)menuDidClose:(NSMenu *)menu;
@end

@interface MenuItem : NSMenuItem
@property NSString *ID;
@property NSString *onClick;
@end

@interface MenuContainer : NSMenu
@property NSString *ID;
@property(nonatomic, weak) MenuItem *hostItem;
@end

extern void Menu_Init();

#endif
