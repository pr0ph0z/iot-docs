# RabbitMQ

::: info
Halaman RabbitMQ ini tidak akan membahas mengenai instalasi serta pembuatan pengguna. Silahkan hubungi administrator.
:::

## Queue

Queue merupakan "kotak masuk" yang nantinya semua pesan akan berakhir di sana dan di-subscribe oleh service / worker.

### Membuat Queue

Untuk membuat queue, silahkan login ke management website RabbitMQ dan buka tab queue, di bagian "Add a new queue", pilih Virtual host sesuai yang dibuatkan oleh administrator, Name diisi dengan "test", dan sisa form lainnya dibiarkan sesuai default lalu klik tombol "Add queue".

![Create Queue](./create-queue.png)

Setelah tombol diklik akan muncul queue yang dibuat sebelumnya.

![Queue List](./queue-list.png)

## Exchange

Jika queue diibaratkan sebagai kotak masuk, maka exchange adalah kantor pos yang bertugas untuk menyortir kemana pesan akan diteruskan. Karena dari embedded system akan dikirimkan melalui protokol MQTT dan service akan subscribe melalui protokol AMQP, maka perlu dijembatani terlebih dahulu

### Membuat Routing Key

Untuk membuat routing key, klik tab Exchanges lalu pilih exchange amq.topic.

Di bagian Add binding, pilih dropdown dengan To queue, lalu isi nama isi queue yang sudah dibuat sebelumnya yaitu test. Pada form Routing key, isi juga test. Routing key inilah yang nanti digunakan sebagai [topic](https://www.hivemq.com/blog/mqtt-essentials-part-5-mqtt-topics-best-practices) di MQTT.

![Create Routing Key](./create-routing-key.png)

Setelah tombol diklik akan muncul binding yang dibuat sebelumnya.

![Routing Key List](./routing-key-list.png)
