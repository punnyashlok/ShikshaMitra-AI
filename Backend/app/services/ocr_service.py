import easyocr

reader = None

def get_reader():
    global reader

    if reader is None:
        reader = easyocr.Reader(["en"], gpu=False)

    return reader


def extract_text(image_path: str):
    reader = get_reader()

    result = reader.readtext(image_path)

    text = " ".join([item[1] for item in result])

    return text