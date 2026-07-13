import easyocr

reader = easyocr.Reader(["en"], gpu=False)


def extract_text(image_path: str):
    result = reader.readtext(image_path)

    text = " ".join([item[1] for item in result])

    return text