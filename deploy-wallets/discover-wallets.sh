count=$(ls -1 | wc -l)
while [ $count -lt 257 ]
do
  NEW_ADDRESS=$(erdpy wallet derive ./new.pem 2>&1 >/dev/null | awk '{ print $6 }' | sed 's/[][]//g')
  SHARD_HEX=$(erdpy wallet bech32 --decode $NEW_ADDRESS | tr -d '\n' | tail -c 2)
  SHARD_INDEX=$(echo $((16#$SHARD_HEX)))

  mv ./new.pem ./${SHARD_INDEX}.pem
  count=$(ls -1 | wc -l)
  echo $count
done
