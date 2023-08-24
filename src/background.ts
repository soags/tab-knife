chrome.action.onClicked.addListener((currentTab: chrome.tabs.Tab) => {
  tabScissors(currentTab)
})

async function tabScissors(currentTab: chrome.tabs.Tab) {
  var windowTabs = await chrome.tabs.query({ windowId: currentTab.windowId })
  if (windowTabs.length < 2) {
    return
  }

  var moveTabs = windowTabs.filter((tab) => tab.index >= currentTab.index)
  chrome.windows.create({}, async (newWindow) => {
    if (!newWindow) {
      return
    }

    await Promise.all(
      moveTabs.map((tab) => {
        if (tab.id) {
          return chrome.tabs.move(tab.id, {
            windowId: newWindow.id,
            index: -1,
          })
        }
      })
    )

    var blankTab = (
      await chrome.tabs.query({ windowId: newWindow.id, index: 0 })
    )[0]
    if (blankTab.id) {
      chrome.tabs.remove(blankTab.id)
    }
  })
}
