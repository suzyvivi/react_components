interface queryItemParam {
    curKey: string,
    originList: any[],
    callback?: Function
}

export const queryItem = (param: queryItemParam) => {
    if (!param.curKey) {
        return
    }
    if (!param.originList || param.originList.length === 0) {
        return
    }
    for (let i = 0; i < param.originList.length; i++) {
        if (param.curKey === param.originList[i]['key']) {
            param.callback && param.callback()
            break
        } else {
            if (param.originList[i]['children'] && param.originList[i]['children']?.length) {
                queryItem({
                    curKey: param.curKey,
                    originList: param.originList[i]['children'],
                    callback: param.callback
                })
            }
        }
    }
}
