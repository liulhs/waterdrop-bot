FROM python:3.11-bullseye

RUN apt-get update && apt-get install -y libavformat-dev libavcodec-dev libavdevice-dev libavfilter-dev libavutil-dev libswresample-dev libswscale-dev

WORKDIR /app


COPY requirements.txt /app/

RUN pip3 install -r requirements.txt

COPY . /app

EXPOSE 7860

CMD ["python3", "main.py"]