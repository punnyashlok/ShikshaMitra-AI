# Stores the latest uploaded PDF text.
# (Version 1 - single user)

pdf_text = ""


def save_pdf(text: str):
    global pdf_text
    pdf_text = text


def get_pdf():
    return pdf_text


def clear_pdf():
    global pdf_text
    pdf_text = ""