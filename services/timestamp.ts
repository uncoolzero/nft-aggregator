export default function timestamp() {
    var currentTimestamp = Math.floor((Date.now() / 1000))
    var startOfDay = currentTimestamp - 86400

    return startOfDay
}