from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

path = "public/cv/GeZehao_CV.pdf"
c = canvas.Canvas(path, pagesize=A4)
width, height = A4
c.setFillColorRGB(0.114, 0.114, 0.122)
c.setFont("Helvetica-Bold", 28)
c.drawString(64, height - 96, "Ge Zehao")
c.setFillColorRGB(0.431, 0.431, 0.451)
c.setFont("Helvetica", 14)
c.drawString(64, height - 128, "Curriculum vitae placeholder")
c.setFillColorRGB(0.0, 0.443, 0.89)
c.setFont("Helvetica-Bold", 12)
c.drawString(64, height - 178, "TODO: replace this file with the final CV")
c.setFillColorRGB(0.431, 0.431, 0.451)
c.setFont("Helvetica", 10)
c.drawString(64, 52, "Website repository placeholder - July 2026")
c.showPage()
c.save()
