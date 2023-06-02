import gspread

CODE = "1B7huX51Ta8nyxYw-Jh04GUSzlhJTezBP6XcpHvErwx4"
gc = gspread.service_account(filename='key.json')
sheet = gc.open_by_key(CODE)

caminho = "Obrigatórias"
caminho_eletivas = "Eletivas"
caminho_optativas = "Optativas"
excel_obrigatorias = sheet.worksheet(caminho)
excel_eletivas = sheet.worksheet(caminho_eletivas)
excel_optativas = sheet.worksheet(caminho_optativas)


len_semestre1 = len(excel_obrigatorias.col_values(2))
len_semestre2 = len(excel_obrigatorias.col_values(5))
len_semestre3 = len(excel_obrigatorias.col_values(8))
len_semestre4 = len(excel_obrigatorias.col_values(11))
len_semestre6 = len(excel_obrigatorias.col_values(14))
len_semestre7 = len(excel_obrigatorias.col_values(17))
len_semestre8 = len(excel_obrigatorias.col_values(20))


len_semestre4_eletivas = len(excel_eletivas.col_values(2))
len_semestre5_eletivas = len(excel_eletivas.col_values(5))

len_optativas = len(excel_optativas.col_values(2))