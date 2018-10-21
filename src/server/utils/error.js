export default function err(errorCode, path, err) {
  console.log(err)
    switch (Number(errorCode)) {
        case 404:
            return {
                errorCode,
                main: "Not Found",
                body: `We can't seem to find what you're looking for, ${path} might not exist`
            }
        case 500:
            return {
                errorCode,
                main: "Internal Server Error",
                body: "Something went wrong. We've gone ahead and notified someone who can help fix this, our apologies!"
            }
        default:
            return {
                errorCode,
                main: "Uh oh",
                body: "Something went wrong. We've gone ahead and notified someone who can help fix this, our apologies!"
            }
    }
}
