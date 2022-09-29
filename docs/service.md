# Service

_Service_ dibuat untuk menerima pesan dari _message broker_ dan mengolahnya sesuai dengan kebutuhan lalu dimasukkan ke dalam _database_.

## Clone Source Code

_Clone_ atau _download template source code service_ yang sudah disediakan di [https://github.com/pr0ph0z/iot-service](https://github.com/pr0ph0z/iot-service), masuk ke dalam folder yang sudah di-_clone_, lalu buka IDE dengan path folder tersebut.

## Struktur Project

```
.
├── .env.example
├── index.js
└── src/
    ├── config/
    │   └── index.js
    ├── controllers/
    │   └── test.js
    ├── databases/
    │   └── mongo.js
    ├── message_brokers/
    │   └── amqp.js
    ├── models/
    │   └── test.js
    └── consumer.js
```

- **.env.example** berfungsi untuk menyimpan key yang diperlukan untuk disimpan di file **.env**
- **index.js** berfungsi untuk melakukan inisiasi koneksi ke _database_, AMQP, dan mulai _subscribe_ pesan dari RabbitMQ
- **config/index.js** berfungsi untuk menyimpan _config variable_, berisi _config_ yang di-_load_ dari file **.env**
- **controllers** folder yang bertujuan untuk menyimpan semua file dimana business logic ketika pesan dari RabbitMQ diterima dapat diproses
- **databases** folder yang bertujuan untuk menyimpan fungsi inisiasi koneksi ke database
- **message_brokers** folder yang bertujuan untuk menyimpan fungsi inisiasi ke _message broker_ beserta fungsi lain yang dibutuhkan
- **models** folder yang bertujuan untuk menyimpan model dari skema database yang dibutuhkan

## Edit Environment File

Buka file **.env.example**, _copy_ isinya, buat file baru dengan nama **.env**, lalu paste isi dari **.env.example** dan isi sesuai nilai yang dibutuhkan

<Tabs>
<Tab name=".env.example" text=".env.example" :max-height="450">

```
RMQ_URL=
MONGO_URL=
PUBLISH_QUEUE=
CONSUME_QUEUE=
```

</Tab>
<Tab name=".env" text=".env" :max-height="450">

```
RMQ_URL=rabbitmq://test:test@localhost:5672/%2Ftest
MONGO_URL=mongodb://test:testlocalhost:27017/test
PUBLISH_QUEUE=test
CONSUME_QUEUE=test
```

</Tab>
</Tabs>

## Install Dependencies

_Install dependencies_ yang dibutuhkan dengan perintah `npm install`

## Jalankan Service

Untuk menjalankan service jalankan perintah `node index.js`

## Simulasi

Simulasi dapat dilakukan di _management website_ RabbitMQ di tab **Exchanges**, pilih **amq.topic**.

Di bagian **Publish message** pada form **Routing key**, tambahkan _routing key_ yang sudah dibuat sebelumnya dan isi **Payload** dengan nilai **A#B#C** lalu cek terminal dimana service dijalankan. Jika _log message_-nya sama seperti gambar di bawah, artinya sudah sukses dilakukan.

![Start Service](./start-service.png)

## Apa yang Terjadi?

Kalau kital lihat di `index.js`, setelah dilakukan inisiasi ke koneksi, dipanggil fungsi `consume()` dari file `src/consume.js` dengan parameter variabel koneksi atau channel tersebut. Di dalam fungsi consume, dipanggil fungsi `create()` dari file `src/controllers/main.js` dengan parameter channel dan pesan yang diterima.

Setelah pesan diterima, karena idenya adalah mengirim beberapa nilai dalam satu pesan, maka dilakukanlah _string splitting_ dengan `#` sebagai _delimiter_ atau pembatasnya sehingga didapatlah 3 nilai dan diberi nama `valueA`, `valueB`, dan `valueC`.

Variabel-variabel tersebut akhirnya dimasukkan ke dalam _database_ dengan memangil model yang sudah dibuat skema sebelumnya di `src/models/test.js`.

<Tabs>
<Tab name="index.js" text="index.js" :max-height="450">

```js{4}
async function main() {
  try {
    const connection = await amqp.connectToAmqp();
    await consumer.consume(connection);

    logger.info("Consuming...");
  } catch (error) {
    logger.error(error);
  }
}
```

</Tab>
<Tab name="consumer.js" text="src/consumer.js" :max-height="450">

```js{4}
exports.consume = async channel => {
  channel.consume(process.env.CONSUME_QUEUE, async msg => {
    logger.info("Got a message");
    await mainController.create(channel, msg);
  });
};
```

</Tab>
<Tab name="main.js" text="src/controllers/main.js" :max-height="450">

```js{2,5-9}
async function create(amqpChannel, message) {
  const [valueA, valueB, valueC] = message.content.toString().split("#");

  try {
    await Test.create({
      value_a: valueA,
      value_b: valueB,
      value_c: valueC
    });

    amqpChannel.ack(message);
  } catch (error) {
    logger.error(error);
  }
}
```

</Tab>
<Tab name="test.js" text="src/models/test.js" :max-height="450">

```js{3-11}
const testModel = new mongoose.Schema(
  {
    value_a: {
      type: String
    },
    value_b: {
      type: String
    },
    value_c: {
      type: String
    }
  },
  {
    versionKey: false,
    collection: "test"
  }
);
```

</Tab>
</Tabs>

## Cek Data

Data yang sudah dibuat tadi dapat dilihat di MongoDB Compass dengan menekan tombol **Refresh**

![Mongo Data](./mongo-data.png)
