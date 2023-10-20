from fastapi import FastAPI, UploadFile, File, Form

from fastapi.middleware.cors import CORSMiddleware
# from fastapi.staticfiles import StaticFiles


import banco


app = FastAPI()




app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],  # ou ['http://seu-dominio.com']
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/static/landing-page')
def landingPage():
    return {"Mensagem:":"Teste Levi"}


@app.get('/obrigatorias')
def obrigatorias():
    obrig = []
    s1 = banco.excel_obrigatorias.get(f'B3:E{banco.len_semestre1}')
    s2 = banco.excel_obrigatorias.get(f'G3:J{banco.len_semestre2}')
    s3 = banco.excel_obrigatorias.get(f'L3:O{banco.len_semestre3}')
    s4 = banco.excel_obrigatorias.get(f'Q3:T{banco.len_semestre4}')
    s5 = banco.excel_obrigatorias.get(f'V3:Y{banco.len_semestre6}')
    s6 = banco.excel_obrigatorias.get(f'AA3:AD{banco.len_semestre6}')
    s7 = banco.excel_obrigatorias.get(f'AF3:AI{banco.len_semestre7}')
    s8 = banco.excel_obrigatorias.get(f'AK3:AN{banco.len_semestre8}')
    obrig.extend((s1, s2, s3, s4,s5, s6, s7, s8))

    return obrig


@app.get('/eletivas')
def eletivas():
    elet = []
    s_e_4 = banco.excel_eletivas.get(f'B3:E{banco.len_semestre4_eletivas}')
    s_e_5 = banco.excel_eletivas.get(f'G3:J{banco.len_semestre5_eletivas}')
    elet.extend((s_e_4, s_e_5))
    return elet

@app.get('/optativas')
def optativas():

    optativa = banco.excel_optativas.get(f'B2:F{banco.len_optativas}')
    return optativa


@app.get('/final')
def final():
    return ('Acho que deu bom')


