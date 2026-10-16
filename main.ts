radio.onReceivedValue(function (name, value) {
    if (name == "x") {
        xReceived = value
    } else if (name == "y") {
        yReceived = value
    } else if (name == "g") {
        gear = value
        if (gear == 0) {
            xReceived = 0
            yReceived = 0
            Pixel.delete()
            game.pause()
            basic.showIcon(IconNames.Square)
        } else if (gear == 1) {
            Pixel = game.createSprite(2, 2)
            game.resume()
        }
    }
    if (gear == 1) {
        Pixel.set(LedSpriteProperty.X, Math.map(xReceived, -1, 1, 0, 4))
        Pixel.set(LedSpriteProperty.Y, Math.map(yReceived, -1, 1, 0, 4))
        if (yReceived > 0) {
            RightWheel = 90 + 90 * (Math.abs(yReceived) * Math.constrain(yReceived - xReceived, -1, 1))
            LeftWheel = 90 - 90 * (Math.abs(yReceived) * Math.constrain(yReceived + xReceived, -1, 1))
        } else {
            RightWheel = 90 + 90 * (Math.abs(yReceived) * Math.constrain(yReceived + xReceived, -1, 1))
            LeftWheel = 90 - 90 * (Math.abs(yReceived) * Math.constrain(yReceived - xReceived, -1, 1))
        }
        pins.servoWritePin(AnalogPin.P0, RightWheel)
        pins.servoWritePin(AnalogPin.P1, LeftWheel)
    }
})
let LeftWheel = 0
let RightWheel = 0
let Pixel: game.LedSprite = null
let gear = 0
let yReceived = 0
let xReceived = 0
radio.setGroup(10)
radio.setTransmitPower(7)
xReceived = 0
yReceived = 0
gear = 0
basic.showIcon(IconNames.Square)
