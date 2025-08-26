import PyPDF2
import sys
import os
import glob

def extract_pdf_text(pdf_path):
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ''
            for page_num, page in enumerate(reader.pages):
                page_text = page.extract_text()
                text += f'--- Page {page_num + 1} ---\n{page_text}\n\n'
            return text
    except Exception as e:
        return f'Error: {e}'

if __name__ == "__main__":
    # Find PDF files in current directory
    current_dir = os.path.dirname(os.path.abspath(__file__))
    pdf_files = glob.glob(os.path.join(current_dir, "*.pdf"))
    
    if not pdf_files:
        print("No PDF files found in the current directory.")
        sys.exit(1)
    
    if len(pdf_files) == 1:
        pdf_path = pdf_files[0]
        print(f"Found PDF file: {os.path.basename(pdf_path)}")
    else:
        print("Multiple PDF files found:")
        for i, pdf_file in enumerate(pdf_files):
            print(f"{i+1}. {os.path.basename(pdf_file)}")
        
        try:
            choice = int(input("Select a PDF file (enter number): ")) - 1
            if 0 <= choice < len(pdf_files):
                pdf_path = pdf_files[choice]
            else:
                print("Invalid selection.")
                sys.exit(1)
        except ValueError:
            print("Invalid input.")
            sys.exit(1)
    
    extracted_text = extract_pdf_text(pdf_path)
    
    # Save to markdown file
    output_path = pdf_path.replace('.pdf', '_extracted.md')
    try:
        with open(output_path, 'w', encoding='utf-8') as output_file:
            output_file.write(f"# Extracted Text from PDF\n\n")
            output_file.write(f"**Source:** {os.path.basename(pdf_path)}\n\n")
            output_file.write(extracted_text)
        print(f"Text extracted and saved to: {os.path.basename(output_path)}")
    except Exception as e:
        print(f"Error saving file: {e}")
