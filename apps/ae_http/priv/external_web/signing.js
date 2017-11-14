
//pubkeys
pub1 = atob("BG1gMoweqvCGQLibo/PkAeictba6qGoyYNWcA8dEK29FaI0pktEwte6HKTCV/AT9IBLfc7iZ+fVlAB0YjdC09lM=");
pub2 = atob("BLO4W9Peld0TXMa1IcbQqGDS6O2BOJT8S3GECUMmcCyW46n3iarc6aVW6+DuiGJvKmmEP+Vp7l7i8rlBBnS2osM=");

//privkeys
priv1 = atob("2kYbRu2TECMJzZy55fxdILBvM5wJM482lKLTRu2e42U=");
priv2 = atob("YJx/2r3S6+wOPhu7HHAt5g39a8LMsAC1m1Ff6Unvjzk=");

//signed tx
//stx = ["signed",["channel_block",0,1],"TUVVQ0lGUmdLQlZZcTlCdFJZOUdHNHR3b2JYc1hDYzJHSTRvQ0UzKytraExwemN1QWlFQS8zTFZEbDlaVmk3MC90aEx5SlJXYlc0NnRMakRUUldXb2FTdllHcmlnN3c9","TUVVQ0lRQzVsTW9VVWxFbmJ1blNiVGVCZUk0VlRzTDZ3UEVERnBwU1B0dDBwRnZOL1FJZ1drM21mKzhtcXJmTEVDYWZFYkdMTWRjVDFWMVBWSjYwK3U3RVNBckdIMTg9",[-6]];
//stx = ["signed",["create_acc_tx","BL18ctFCJ4/i0HuiIJbF/F/ktgjADSub5rbe3RBIrsDUHBUVqqoEmv5wLEmjq3d8pTA07J2PQo87CY2B+0baQQk=",1,20,"BJjOADT/mMg0BsqQkCDcEb/ylv6W85wipEKrY3qV5z3XvVrNygvVoEXsA6tncAoMuyvMB5Prepzqql3zZ1sDjjo=",150000000000],"TUVZQ0lRRGNveWNkZDRxM3JmMTdHZjJPWndBV0w4OFJ4QzJKeEQvYmxsU1R0cE55bWdJaEFQcTJjNS8xVkVvWG5xd1FvN29WK1F6WjJvRjVqK29MekF5ZVBjVGREbm5F",[-6]];
stx = ["signed",["create_acc_tx","BHuqX6EKohvveqkcbyGgE247jQ5O0i2YKO27Yx50cXd+8J/dCVTnMz8QWUUS9L5oGWUx5CPtseeHddZcygmGVaM=",1,20,"BJh+CRhyKiDRSJfjUFMwUVdC/3+Ahj644HWxbLzlddhggWg+2c+h1/i9u8ono9v3l7Vb4E5WSEZouDUUH2XDI58=",150000000000],"TUVVQ0lRRDRVUjVwV1M4bWM2U1dvK2EzWDY3WlBrRnk4Mlg3cW9qNkxXTTFaUzJ1MGdJZ2JGTmlkWFdYNDJ0V2dEcUZ5aUo4NnhqWnVTMlZKNGwxTGJvcjdWeFVXckU9",[-6]];
tx = stx[1];
//console.log(JSON.stringify(tx));
//console.log(pub1);


var EC = elliptic.ec
var ec = new EC('secp256k1');
var key1 = ec.genKeyPair({entropy: priv1});
var key2 = ec.genKeyPair({entropy: priv2});
/*
console.log("example signature");
console.log(key1.sign([]));
*/
//var key1 = ec.keyFromSecret(toHex(priv1), 'hex');
//var key2 = ec.keyFromSecret(toHex(priv2), 'hex');
//var key2 = ec.keyFromPublic(toHex(pub2), 'hex');
//var key = ec.genKeyPair();

//var msg = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
//var signature = key.sign(msg);

//var key2 = ec.keyFromPublic(pub1, "");

function toHex(str) {
    var hex = '';
    for(var i=0;i<str.length;i++) {
        l = str.charCodeAt(i).toString(16);
        var z = "";
        if (l.length < 2) { z = "0"; }
        hex += z;
	hex += ''+str.charCodeAt(i).toString(16);
    }
    return hex;
}

//console.log(key1);
var pubPoint = key1.getPublic();
//console.log(pubPoint.encode('hex'));
//04b3b85bd3de95dd135cc6b521c6d0a860d2e8ed813894fc4b718494326702c96e3a9f789aadce9a556ebe0ee88626f2a69843fe569ee5ee2f2b941674b6a2c3
/*
serialize(X) when is_binary(X) -> 
    S = size(X),
    <<0:8, S:32, X/binary>>;
serialize(L) when is_list(L) ->
    A = serialize_list(L),
    S = size(A),
    <<1:8, S:32, A/binary>>;
serialize(X) when is_tuple(X) -> 
    A = serialize_list(tuple_to_list(X)),
    S = size(A),
    <<2:8, S:32, A/binary>>;
serialize(X) when is_integer(X) -> 
    <<3:8, X:512>>;
serialize(X) when is_atom(X) -> 
    A = list_to_binary(atom_to_list(X)),
    S = size(A),
    <<4:8, S:32, A/binary>>;
serialize(X) -> 
    io:fwrite("testnet sign serialize error"),
    io:fwrite(packer:pack(X)),
    1=2.
serialize_list([]) -> <<>>;
serialize_list([A|B]) -> 
    C = serialize(A),
    D = serialize_list(B),
    <<C/binary, D/binary>>.
*/
function serialize(data) {
    if (Number.isInteger(data)) {
        console.log("serialize integer");
        //<<3:8, X:512>>;
        console.log(integer_to_array(3, 1));
        var x = integer_to_array(3, 1).concat(
            integer_to_array(data, 64));
        console.log(JSON.stringify(x));
        return x;
    } else if (Array.isArray(data)) {
        if (data[0] == -6) { //its a list.
            console.log("serialize array");
            //<<1:8, S:32, A/binary>>;
            var d0 = data.slice(1);
            var rest = serialize_list(d0);
            return integer_to_array(1, 1).concat(
                integer_to_array(rest.length, 4)).concat(
                    rest);

        } else if (data[0] == -7) { //it is a tuple
            //<<2:8, S:32, A/binary>>;
            console.log("serialize tuple 1");
            var d0 = data.slice(1);
            var rest = serialize_list(d0);
            return integer_to_array(2, 1).concat(
                integer_to_array(rest.length, 4)).concat(
                    rest);
        } else { //assume it is a record. a tuple where the first element is an atom. This is the only place that atoms can occur.
            console.log("serialize tuple 2");
            console.log(data[0]);
            var h = data[0];
            var d0 = data.slice(1);
            //<<4:8, S:32, A/binary>>;
            var atom_size = h.length;
            var first = integer_to_array(4, 1).concat(
                integer_to_array(atom_size, 4)).concat(
                    string_to_array(h));
            //console.log("first ");
            //console.log(JSON.stringify(first));
            var rest = first.concat(serialize_list(d0));
            return integer_to_array(2, 1).concat(
                integer_to_array(rest.length, 4)).concat(
                    rest);
        }
    } else {//assume it is a binary
        //<<0:8, S:32, X/binary>>;
        console.log("serialize binary");
        var rest = string_to_array(atob(data));
        return integer_to_array(0, 1).concat(
            integer_to_array(rest.length, 4)).concat(
                rest);
    }
}
function serialize_list(l) {
    var m = [];
    for (var i = 0; i < l.length; i++) {
        m = m.concat(serialize(l[i]));
        //m.push(serialize(l[i]));
    }
    return m;
}
function sign(data, key) {
    //ecdsa, sha356
    var d2 = serialize(data);
    var h = hash(d2);
    var sig = key.sign(h);
    return sig.toDER();
}
function verify(data, sig, key) {
    var d2 = serialize(data);
    console.log("serialized ");
    console.log(JSON.stringify(d2));
    var h = hash(d2);
    return key.verify(h, sig, 'hex');
}





signing_test();
function signing_test() {

    console.log("signing test");
    console.log("signing test");
    //console.log(JSON.stringify(serialize([-6, 1,2,3])));
    //console.log(JSON.stringify(serialize(["abc", 1])));
    //console.log(JSON.stringify(serialize([-7, 1])));
    //console.log(JSON.stringify(serialize([-6, "AQ=="])));
    //console.log(JSON.stringify(serialize(stx)));
    signing_test2();

}
function signing_test2() {


    bytes_test  = [131,104,10,100,0,6,104,101,97,100,101,114,97,0,109,0,0,
                   0,32,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                   0,0,0,0,0,0,0,109,0,0,0,32,35,140,48,80,16,197,111,105,
                   90,87,4,86,159,208,106,228,50,120,168,222,27,214,44,154,
                   109,158,154,150,130,224,222,51,109,0,0,0,32,161,153,111,
                   202,251,68,226,226,141,196,169,144,98,226,25,169,4,209,
                   137,191,155,230,168,116,187,196,23,202,9,163,215,194,97,
                   0,98,0,0,25,52,97,6,109,0,0,0,32,0,0,0,0,0,0,0,0,0,0,0,
                   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,97,0];
    var data0 = stx[1];
    var sig0 = toHex(atob(stx[2]));
    console.log(sig0);
    //console.log(stx[1][1]);
    //BHuqX6EKohvveqkcbyGgE247jQ5O0i2YKO27Yx50cXd+8J/dCVTnMz8QWUUS9L5oGWUx5CPtseeHddZcygmGVaM=
    //console.log(toHex(atob(stx[1][1])));
    //047baa5fa1aa21bef7aa91c6f21a0136e3b8de4ed22d9828edbb631e7471777ef09fdd954e7333f10594512f4be68196531e423edb1e78775d65cca98655a3
    var key0 = ec.keyFromPublic(toHex(atob(stx[1][1])), "hex");
    console.log("made key");
    //var foo = key0.verify(data0, sig0);
    console.log(verify(data0, sign(data0, key1), key1));
    console.log(sig0);
    console.log(sig0.length);
    
    var m = sig0.match(/([a-f\d]{64})/gi);
    var r = m[0];
    var s = m[1];
    sig = {"r": r, "s": s};
    var foo = verify(data0, sig, key0);
    console.log(foo);
}
