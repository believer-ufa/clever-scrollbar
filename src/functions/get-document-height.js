// Desc: http://stackoverflow.com/a/1147768/2035123
export default function getDocumentHeight() {
    var body = document.body,
        html = document.documentElement;

    return Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
    )
}