import requests

def get_product_count(ItemID:int):

    url = f'https://card.wb.ru/cards/v2/detail?appType=1&curr=rub&dest=-1257786&spp=30&nm={ItemID}'
    Quantity = {}
    r = requests.get(url)
    item = r.json()['data']['products']
    for products in item:
        product_name = products['name']
        for sizes in products['sizes']:
            for i, stocks in enumerate(sizes['stocks'], 1):
                Quantity[i] = {'warehouse' : stocks["wh"], 'quantity' : stocks["qty"]}
    return {product_name : Quantity}

if __name__ == '__main__':
    print(get_product_count(14514847))