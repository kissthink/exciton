// +build release

package log

import (
	"github.com/yossoy/exciton/driver"
)

func PrintDebug(fmt string, args ...interface{}) {

}

func PrintInfo(fmt string, args ...interface{}) {

}

func PrintWarning(fmt string, args ...interface{}) {
	driver.Log(driver.LogLevelWarning, fmt, args...)
}
func PrintError(fmt string, args ...interface{}) {
	driver.Log(driver.LogLevelError, fmt, args...)
}