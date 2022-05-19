import { orderPoker } from './pocker'
//牌型
//金子
function isGold(cardList) {
    let color = cardList[0].color;

    if (cardList[1].color == color && cardList[2].color == color) {
        return true;
    }
    return false;
}

//豹子
function isLeopard(cardList) {
    let number = cardList[0].number
    if (cardList[1].number == number && cardList[2].number == number) {
        return true
    }
    return false
}

//顺子
function isList(cardList) {
    if (!isGold(cardList)) {
        let power0 = cardList[0].power;
        let power1 = cardList[1].power;
        let power2 = cardList[2].power;
        let powerList = [power0, power1, power2];
        var newList = quickSort(powerList)
        if (newList[2] - newList[1] == 1 && newList[1] - newList[0] == 1) {
            return true
        } else if (newList[2] == 12 && newList[0] == 0 && newList[1] == 1) {
            return true
        }
        return false
    }
    return false;
}

//顺金
function isListAndGold(cardList) {
    if (isList(cardList) && isGold(cardList)) {
        return true
    }
    return false
}

//对子
function isDouble(cardList) {
    if (!isLeopard(cardList)) {
        let cards = [];
        for (let i = 0; i < 3; i++) {
            cards.push(cardList[i]);
        }
        let number2 = cards.pop().number;
        let number1 = cards.pop().number;
        if (cards[0].number == number1 || cards[0].number == number2 ||
            number1 == number2) {
            return true;
        }
    }
    return false;
}

//获得三张牌中power最大的
function getMaxCard(cardList) {
    let max = cardList[0]
    cardList.forEach(card => {
        if (card.power > max.power) {
            max = card
        }
    });
    return max;
}
//获得三张牌中power中间的
function getmiddleCard(cardList) {
    let newCardList = []
    for (let i = 0; i < cardList.length; i++) {
        newCardList[i] = cardList[i]
    }
    let max = getMaxCard(newCardList)
    let min = getMinCard(newCardList)
    return newCardList.find(card => {
        return card.power < max.power && card.power > min.power
    })
}

//获得三张牌中power最小的
function getMinCard(cardList) {
    let min = cardList[0]
    cardList.forEach(card => {
        if (card.power > min.power) {
            min = card
        }
    });
    return min;
}

//获得三张牌中重复的牌
function getRepeat(cardList) {
    let example = cardList[0]
    for (let i = 1; i < cardList.length; i++) {
        if (cardList[i].power == example.power) {
            return example
        }
    }
    return cardList[1]
}

//获取对子牌类型中的单牌
function getSingle(cardList) {
    let newCardList = []
    for (let i = 0; i < cardList.length; i++) {
        newCardList[i] = cardList[i]
    }
    let example = newCardList[0]
    newCardList.splice(0, 1)
    if (newCardList[0].power == example.power) {
        return newCardList[1]
    }
    return example
}

/**
 * 
 * @param {*} cardType 牌型
 * @param {*} cardList1 用户1的牌
 * @param {*} cardList2 用户2的牌
 * @returns 
 * 结果返回true是用户1赢,false是用户2赢
 */
export function contrastSameType(cardType, cardList1, cardList2) {
    switch (cardType) {
        //豹子
        case 0:
            if (cardList1[0].power > cardList2[0].power) {
                return true
            } else {
                return false
            }
        //顺金
        //未考虑123
        case 1:
            if (getMaxCard(cardList1).power > getMaxCard(cardList2).power) {
                return true
            } else {
                return false
            }
        //金子
        case 2:
            let orderCardList1 = orderPoker(cardList1)
            let orderCardList2 = orderPoker(cardList2)
            if (orderCardList1[2].power > orderCardList2[2].power) {
                return true
            } else if (orderCardList1[2].power < orderCardList2[2].power) {
                return false
            } else {
                if (orderCardList1[1].power > orderCardList1[1].power) {
                    return true
                } else if (orderCardList1[1].power < orderCardList1[1].power) {
                    return false
                } else {
                    if (orderCardList1[0].power > orderCardList1[0].power) {
                        return true
                    } else if (orderCardList1[0].power < orderCardList1[0].power) {
                        return false
                    } else {
                        return false
                    }
                }
            }
        //顺子
        case 3:
            if (getMinCard(cardList1).power > getMaxCard(cardList2)) {
                return true
            } else {
                return false
            }
        //对子
        case 4:
            if (getRepeat(cardList1).power > getRepeat(cardList2).power) {
                return true
            } else if (getRepeat(cardList1).power == getRepeat(cardList2).power) {
                if (getSingle(cardList1).power > getSingle(cardList2).power) {
                    return true
                }
                return false
            }
            return false
        //散牌
        case 5:
            let orderCardList3 = orderPoker(cardList1)
            let orderCardList4 = orderPoker(cardList2)
            if (orderCardList3[2].power > orderCardList4[2].power) {
                return true
            } else if (orderCardList3[2].power == orderCardList4[2].power) {
                if (orderCardList3[1].power > orderCardList4[1].power) {
                    return true
                } else if (orderCardList3[1].power == orderCardList4[1].power) {
                    if (orderCardList3[0].power > orderCardList4[0].power) {
                        return true
                    }
                    return false
                }
            }
            return false
    }
}

//散牌
function isSingle(cardList) {
    if (!isGold(cardList) && !isLeopard(cardList) && !isList(cardList) && !isListAndGold(cardList) && !isDouble(cardList)) {
        return true
    }
    return false
}

//判别
// 0豹子 1顺金 2金子 3顺子 4对子 5散牌
export function judge(cardList) {
    if (isGold(cardList)) {
        return 2
    } else if (isLeopard(cardList)) {
        return 0
    } else if (isListAndGold(cardList)) {
        return 1
    } else if (isList(cardList)) {
        return 3
    } else if (isDouble(cardList)) {
        return 4
    } else {
        return 5
    }
}

//快排
var quickSort = function (arr) {

    if (arr.length <= 1) { return arr; }

    var pivotIndex = Math.floor(arr.length / 2);

    var pivot = arr.splice(pivotIndex, 1)[0];

    var left = [];

    var right = [];

    for (var i = 0; i < arr.length; i++) {

        if (arr[i] < pivot) {

            left.push(arr[i]);

        } else {

            right.push(arr[i]);

        }

    }

    return quickSort(left).concat([pivot], quickSort(right));

};