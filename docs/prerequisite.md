# Prasyarat

Terdapat beberapa hal yang perlu dipenuhi termasuk _software_ yang di-_install_ dan alur yang dipahami secara komprehensif untuk dapat mengikuti panduan secara keseluruhan.

## Software

- [RabbitMQ](https://rabbitmq.com/) (_install_ secara lokal maupun di _server_)
- [MongoDB (plus MongoDB Compass)](https://www.mongodb.com/) (_install_ secara lokal maupun di _server_)
- [NodeJS](https://nodejs.org/)
- [Git](https://git-scm.com/)
- IDE (disarankan untuk menggunakan [Visual Studio Code](https://code.visualstudio.com/))

## Alur

Berikut merupakan alur dari sistem yang akan dibangun:

![Alur Sistem](./alur.png)

**Embedded System** akan mengirimkan pesan yang didapat dari sensor ke **RabbitMQ** melalui protokol MQTT. Setelah pesan dikirimkan, **Service** atau **Worker** yang dibangun dengan NodeJS akan mengambil (_subscribe_) pesan tersebut dan mengolahnya sesuai kebutuhan sebelum nantinya dimasukkan ke dalam _database_, yaitu **MongoDB**. Data yang masuk ke _database_ diambil dan "disajikan" melalui **REST API** yang selanjutnya di-_consume_ oleh **Website** (_client-side_), atau sebagai alternatif bisa juga langsung ditampilkan di **Website** tanpa perlu **REST API** (_server-side_).

## Pertanyaan Umum

### Embedded system

#### Apa itu embedded system?

Embedded system merupakan sebuah _device_ yang letaknya paling ujung yang bertugas untuk mengirimkan data dari sensor ataupun dari input peripheral lain. _Device_ yang umum dipakai adalah Arduino, NodeMCU, atau Raspberry Pi.

### RabbitMQ

#### Apa itu RabbitMQ?

RabbitMQ merupakan sebuah _message broker_ dengan dukungan protokol AMQP, MQTT, dan STOMP yang bertugas untuk menerima pesan dan mengirimkannya kembali.

#### Mengapa RabbitMQ?

Dengan dukungan multi-protokol, RabbitMQ mampu menjembatani protokol sederhana, yaitu MQTT, yang digunakan di _embedded system_ dimana hanya memiliki sumber daya yang terbatas dengan protokol yang lebih kompleks, yaitu AMQP, yang digunakan di _service_ atau _worker_. Selain itu RabbitMQ juga mendukung _routing system_ dengan partisi-partisi yang dapat didefinisikan sendiri dan lebih rumit dari MQTT biasa, mendukung sistem autentikasi untuk memisahkan setiap pengguna, serta _management website_ untuk melihat informasi dari pesan yang masuk ke dalam sistem.

::: tip
Dalam website-nya, RabbitMQ memiliki banyak _hands-on tutorial_ yang meliputi beberapa bahasa pemrograman populer dan dokumentasi yang sangat baik.
:::

### MongoDB

#### Mengapa MongoDB?

MongoDB dipilih karena sifatnya yang _schemaless_. Artinya sebagai pengguna tidak perlu mendefinisikan bagaimana bentuk dari sebuah tabel (atau di MongoDB disebut collection). Maka dari itu proses _prototyping_ bisa dilakukan dengan cepat jika sewaktu-waktu diperlukan perubahan struktur data tanpa harus mengganggu data yang sudah ada.

### Service

#### Mengapa NodeJS

Pengembangan _service_ dapat dilakukan di bahasa pemrograman dan _runtime_ manapun selama mendukung komunikasi dengan AMQP. Hanya saja dalam buku panduan ini digunakan NodeJS agar lebih cepat dalam _prototyping_.
