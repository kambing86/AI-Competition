FROM python:3.6
WORKDIR /ai
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt
COPY . .
CMD [ "python3", "-u" , "./index.py" ]