FROM python:3.11

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY . .

ENV PYTHONPATH=/usr/src/app

EXPOSE 8000

CMD ["uvicorn", "src.server:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
