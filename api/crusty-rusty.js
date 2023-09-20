
//------------------------------------------------------
//
// 🦀 CrustyRusty - An API Suite
// 💡 Version is in the CrustyRusty object
//
//------------------------------------------------------

// Needed more than ever...
const __dave_TODO_dave__ = "🔥 This is a proposed future enhancement";

//------------------------------------------------------
const _emojiset1=[
    `🦀`,
    `🔥`,`🚧`,`✅`,`❌`,`🔀`,
    `⏬`,`🔗`,`☰`,`💡`,`🔔`,
    `🤚`,`🛑`,`🚨`,`💣`,`👀`,
    `🦂`,'🦉'
];

//------------------------------------------------------
const _icon     = n => _emojiset1[n % _emojiset1.length];
_icon.prefix    = (p,  s) => `${p} ${s}`;
_icon.prefixn   = (n,  s) => `${_icon(n)} ${s}`;
_icon.prefixkey = (key,s) => _icon.prefix(CrustyRusty.icon[key], s);
_icon.success   = _icon(3);
_icon.failure   = _icon(4);
_icon.todo      = `${_icon(1)} This is a proposed future enhancement`;
_icon.prefixn(0, `The famous CrustyRusty has 🎉arrived🎉 in style!`);

//------------------------------------------------------
_log = function(args) {
    if (args instanceof Object) {
        console.log( ... args ); 
    } else {
        console.log( ... arguments );
    }
    return _icon.success;
}
_log(_icon.prefixn(0, `The famous CrustyRusty has 🎉arrived🎉 in style!`));
_log.warning = s => {
    console.warn(s); 
    return _icon.success;
} 
_log.error   = s => {
    console.error(s); 
    return _icon.success;
}
_log.open  = title => {
    console.group(title);
    return _icon.success;
}
_log.close = () => {
    console.groupEnd();
    return _icon.success;
}
_log.complete = (title, args) => {
    try {
        _log.open(title);
        return _log(args);    
    } catch(error) {
        _log.close();
        return _icon.failure;
    }
}
_log.rusty={};
_log.rusty.says = s => _log(_icon.prefixkey('rusty', s));
_log.announce = o => {
    const t = o.title || "(not specied)";
    const v = o.version || "(not specified)";
    const s = `${t} version ${v}`;
    const m = _icon.prefixkey('require', s);
    return _log(m);
}
_log.todo = s => {
    const icon = CrustyRusty.icon.todo
    return _log(_icon.prefix(icon, s));
}
_log.look = s => {
    s = s || String(s).trim();
    const icon = CrustyRusty.icon.look;
    return _log(_icon.prefix(icon, s));
}
let _is_node_js_ = false; // TBT later
const __oops = () => {
    throw new Error("🤔 You forgot something!");
}

//------------------------------------------------------
// The big daddy!
const CrustyRusty = {
    version  : '2023-AUG-24',
    comment  : "Designed for the CrustyRusty API Series",
    tipme    : () => {
        const url = CrustyRusty.link['☕'];
        if (_is_node_js_) {
            _log.rusty.says(`Visit: ${url}`);
        } else {
            window.open(url);
        }
    },
    aboutme  : () => {
        const url = CrustyRusty.link.dave;
        if (_is_node_js_) {
            _log.rusty.says(`Visit: ${url}`);
        } else {
            window.open(url);
        }
    },
    icon     : {
        rusty    : _icon(0),
        todo     : _icon(1),
        pending  : _icon(2),
        ok       : _icon(3),
        no       : _icon(4),
        require  : _icon(5),
        path     : _icon(6),
        link     : _icon(7),
        menu     : _icon(8),
        tip      : _icon(9),
        notice   : _icon(10),
        warning  : _icon(11),
        stop     : _icon(12),
        error    : _icon(13), // synonym
        alert    : _icon(13),
        boom     : _icon(14),
        look     : _icon(15),
        bug      : _icon(16),
    },
    says     : _log.rusty.says,
    announce : _log.announce,
    todo     : _log.todo,
    look     : _log.look,
    agent    : {},   // PlaceHolder
    api      : {},   // PlaceHolder
    add_api  : (key, initfn) => {
        key = key || String(key).trim();
        if (!key) __oops();
        if (typeof initfn != 'function') __oops();
        const me = CrustyRusty;
        if (me.api[key]) {
            const p = me.icon.warning;
            const s = "Merging APIs";
            me.says(_icon.prefix(p, s));
            const old = me.api[key]; 
            const add = initfn();
            me.api[key] = {
                ... old,
                ... add
            };
        } else {
            me.api[key] = initfn();
        }
        return me.announce(me.api[key]);
    }
};
CrustyRusty.link = {};
CrustyRusty.link['☕'] = 
`https://www.buymeacoffee.com/nyteowldave`;
CrustyRusty.link.dave = 
`https://sites.google.com/view/dave-wellsted-nyteowl/`;


//------------------------------------------------------
// Engine Detection API
// No public API
// https://chat.openai.com/c/01577e4d-7847-4f7c-82c8-7ce052ace62d
;(boss=>{

function exec(boss) {
    const LOOK = boss.look;
    const TODO = boss.todo;        
    if (typeof _is_node_js_ == 'undefined') {
        console.error("🚨 _is_node_js_ is undefined!")
        throw "🚨 This is NOT a CrustyRusty 🦀 approved app!";
    }
    if (typeof window == 'undefined') {
        boss.agent = `node.js ${process.version}`;
        _is_node_js_ = true;
        exports.CrustyRusty = boss;
        boss.says("Detected node.js");
    } else {
        let a = navigator.userAgent;
        a = a || "(unknown)";
        boss.agent = a;
        _is_node_js_ = false;
        boss.says(`Detected ${boss.agent}`);
    }
}

// Do it!!!
exec(boss);

})(CrustyRusty); // No public API


//------------------------------------------------------
// Reporting API
;((boss, api_key)=>{

// This is TOO fricken easy!!!
function init() {

    const _todo = __dave_TODO_dave__;

    const _reporting_api = {
        title       : "Reporting API",
        version     : boss.version,
        comment     : boss.comment,
        emojis      : _emojiset1, 
        icon        : _icon, 
        log         : _log, 
        oops        : __oops,
        is_node_js  : () => { return _is_node_js_; }
    };    

    return _reporting_api;
}

// Do it!!!
const LOOK = boss.look;
const TODO = boss.todo;
boss.add_api(api_key, init);

})(CrustyRusty, 'reporting');


//------------------------------------------------------
// Data Types API
// https://chat.openai.com/c/6baeba4b-e49e-447e-813b-096bf9b70493
// https://chat.openai.com/c/a91ce8d5-bbc2-48c1-acf3-3859e0359e15
;((boss, api_key)=>{

function init() {

    const _todo = __dave_TODO_dave__;

    // Forward lookup (name from index)
    const _typenames = [
        "undefined", 
        "boolean",  
        "number",
        "string",
        "bigint",   
        "symbol",
        "function",  
        "object",   
    ];

    // Reverse lookup (index from name)
    const _typecodes = (()=>{
        const all = {};
        const count = _typenames.length;
        for (let index=0; index < count; index++) {
            let key = _typenames[index];
            all[key]=index;
        }
        return all;
    })();

    // Internal state variables
    const _state = {
        tiny : 1e-20,
        huge : 1e+20
    };

    const _isinst     = (o, s) => (o instanceof s);
    
    const _istypename = (o, t) => (typeof o === t);
    const _istypecode = (o, n) => (_istypename(o,_typenames[n]));
    
    const _isundef    = o => (_istypecode(o,_typecodes.undefined));
    const _isbool     = o => (_istypecode(o,_typecodes.boolean));
    const _isnum      = o => (_istypecode(o,_typecodes.number));
    const _isstr      = o => (_istypecode(o,_typecodes.string));
    const _isbig      = o => (_istypecode(o,_typecodes.bigint));
    const _issym      = o => (_istypecode(o,_typecodes.symbol));
    const _isfn       = o => (_istypecode(o,_typecodes.function));
    const _isobj      = o => (_istypecode(o,_typecodes.object));
    
    const _isdef      = o => (!isundef(o));
    const _isnull     = o => (o===null);
    const _isarray    = o => (Array.isArray(o));    
    const _isint      = o => (Number.isInteger(o));
    
    const _isnan      = o => (isNaN(o));    
    const _isfin      = o => (isFinite(o));
    const _isinf      = o => (!isfin(o));
    
    const _iszero     = n => (n===0);
    const _isone      = n => (n===1);
    const _isnotzero  = n => (_isnum(n)&&(!_iszero(n)));
    const _isnotone   = n => (_isnum(n)&&(!_isone(n)));
    
    const _isneg      = n => (n<0);
    const _ispos      = n => (n>0);
    
    const _haswhole   = n => (_isnum(n)&&((n%1)===n));
    const _hasfrac    = n => (_isnum(n)&&(n%1));
    
    const _istiny     = n => {
        return (n*n) <= _state.tiny;
    }
    const _ishuge     = n => {
        n=n*n;
        return _isfin(n)
        ? (n >= _state.huge)
        : false;
    }
    const _isbounded  = n => {
        return !(_istiny(n)||_ishuge(n));
    }
    const _isapprox   = (a, b)  => {
        TODO("_isapprox");
    }
    const _iswithin   = (n,a,b) => {
        if (isnan(n)) return false;
        if (isnan(a)) return false;
        if (isnan(b)) return false;
        const u = Math.min(a, b);
        const v = Math.max(a, b);
        return ((u<=n)&&(n<=v));
    }
    
    const _typename = o => {
        if (_isinf(o)) return 'infinity';
        if (_isnull(o)) return 'null';
        TODO("_typename");
    }
    const _typecode = o => {
        TODO("_typecode");
//        if (isinf) return types[];
    }
    
    const _isiterable   = o => (_istypename(o[Symbol.iterator],'function'));
    const _isenumerable = (o, k) => {
        const desc = Object.getOwnPropertyDescriptor(o, k);
        return desc.enumerable;
    }
    
    const _isiterator   = fn => {
        TODO("_isiterator"); 
    }
    const _isgenerator  = fn => {
        TODO("_isgenerator");
    }
    const _isasync      = fn => {
        TODO("_isasync");
    }

    // Number classification (advanced)
    _isnatural = n => (_isint(n)&&(n>0));
    _iswhole   = n => {_isint(n)&&(n>=0)};
    _issquare  = n => (_iszero(Math.sqrt(n)));
    _iscubic   = n => (_iszero(Math.cbrt(n)));
    _isprime   = n => {};
    _isfibo    = n => {};

    // Number classification (relationship)
    _isfactorof   = n => {};
    _isproductof  = n => {};
    _isratioof    = n => {};
    _ispower      = n => {};
    _issumof      = n => {};
    _isdiffof     = n => {};

    return {
        title   : 'Data Types API',
        version : boss.version, 
        comment : boss.comment, 
        coffee  : boss.tipme,
        state   : _state,
        // API
        data : { 
            type : {
                names: _typenames,
                codes: _typecodes
            }
        },
        lookup : {
            typename : _typename,
            typecode : _typecode
        },
        ispixel : {
            point           : TODO("ispixel.point"), 
            size            : TODO("ispixel.size"), 
            rect            : TODO("ispixel.rect"),
            rectangle       : TODO("ispixel.rectangle"),           
        },
        isgeom : {
            real            : TODO("isgeom.real"), 
            imag            : TODO("isgeom.imag"), 
            imaginary       : TODO("isgeom.imaginary"), 
            complex         : TODO("isgeom.complex"),
            vector : {
                cart        : TODO("isgeom.vector.cart"),
                rect        : TODO("isgeom.vector.rect"),
                polar       : TODO("isgeom.vector.polar"), 
                cyl         : TODO("isgeom.vector.cyl"),    
                cartesian   : TODO("isgeom.vector.cartesian"),
                rectangular : TODO("isgeom.vector.rectangular"),
                cylindrical : TODO("isgeom.vector.cylindrical"),
                spherical   : TODO("isgeom.vector.spherical"),
            },
            plane           : TODO("isgeom.plane"),
            ray             : TODO("isgeom.ray"),
            line            : TODO("isgeom.line"),
            pane            : TODO("isgeom.pane"), 
            angles          : TODO("isgeom.angle"),
        },
        isnum : {
            todo : {
                natural       : _isnatural, 
                whole         : _iswhole,
                prime         : _isprime,
                square        : _issquare,
                cubic         : _iscubic,
                of : {
                    factor    : TODO("isnum.of.factor" ), 
                    product   : TODO("isnum.of.product"), 
                    ratio     : TODO("isnum.of.ratio"  ), 
                    power     : TODO("isnum.of.power"  ), 
                    sum       : TODO("isnum.of.sum"    ),                        
                    diff      : TODO("isnum.of.diff"   ),                        
                }
            },
            finite        : _isfin, 
            bigint        : _isbig,
            integer       : _isint, 
            zero          : _iszero, 
            one           : _isone, 
            positive      : _ispos,   
            within        : _iswithin,
            tiny          : _istiny,
            huge          : _ishuge,
            bounded       : _isbounded,
            approx        : _isapprox,
            approximately : _isapprox,
            not : {
                zero     : _isnotzero,
                one      : _isnotone,
                finite   : _isinf,
                positive : _isneg,
                number   : _isnan
            }
        },
        isobject : {
            instance    : _isinst,
            iterable    : _isiterable, 
            enumerable  : _isenumerable,
            array       : _isarray
        },
        isfunction : {
            iterator    : _isiterator,
            generator   : _isgenerator,
            async       : _isasync
        },
        is: {
            type: {
                name : _istypename,
                code : _istypecode,
            },
            "null"          : _isnull,
            defined         : _isdef, 
            "undefined"     : _isundef,
            boolean         : _isbool, 
            object          : _isobj,
            string          : _isstr, 
            symbol          : _issym, 
            nan             : _isnan, 
            number          : _isnum,
            "function"      : _isfn,
        },
        has: {
            part: {
                whole   : _haswhole,
                frac    : _hasfrac
            }
        },
    };

}

// Do it!!!
const LOOK = boss.look;
const TODO = boss.todo;
boss.add_api(api_key, init);

})(CrustyRusty, 'typeinfo');


//------------------------------------------------------
// Math API
;((boss, api_key)=>{

function init() {

    const _todo = __dave_TODO_dave__;

    // See: errno codes
    // https://www.man7.org/linux/man-pages/man3/errno.3.html

    const _throw = (e, o) => { 
        e = new Error(e);
        e.ncs = o;
        throw e;
    };

    // const _ERANGE = "🚨 Argument is out of range";
    // const _throw_erange = () => _throw(_ERANGE);
    
    const _EINVAL = "🚨 Invalid argument";
    const _throw_einval = (o, t) => {
        const s = `${_EINVAL} =|> expected ${t||'?'}`;
        _throw(s, o);
    }
    
    const _EILSEQ = "🚨 Illegal sequence";
    const _throw_eilseq = o => {
        _throw(_EILSEQ, o);
    }

    // Type Info to DA RESCUE!
    const ti  = boss.api.typeinfo;

    const _ispnt    = o => ti.isdef(o.i) && ti.isdef(o.j);
    const _issize   = o => ti.isdef(o.w) && ti.isdef(o.h);
    const _isrect   = o => 
           ti.isdef(o.left  )
        && ti.isdef(o.top   )
        && ti.isdef(o.right )
        && ti.isdef(o.bottom);
    const _iscplx   = o => ti.isdef(o.re) && ti.isdef(o.im);
    const _isvec2   = o => ti.isdef(o.x) && ti.isdef(o.y);
    const _isvec3   = o => _isvec2(o) && ti.isdef(o.z);
    const _isvec4   = o => _isvec3(o) && ti.isdef(o.w);
    const _isray2   = o => 
           _isvec2(o.origin) 
        && _isvec2(o.normal);
    const _isray3   = o => 
           _isvec3(o.origin) 
        && _isvec3(o.normal);
    const _isplane  = o => 
           ti.isdef(o.a)
        && ti.isdef(o.b)
        && ti.isdef(o.c)
        && ti.isdef(o.d);
    const _ispane   = o => 
           ti.isdef(o.x)
        && ti.isdef(o.y)
        && ti.isdef(o.w)
        && ti.isdef(o.h);
    const _isline2  = o => 
           _isvec2(o.origin)
        && _isvec2(o.target);
    const _isline3  = o => 
           _isvec3(o.origin)
        && _isvec3(o.target);
    const _ispol  = o => 
           ti.isdef(rho)
        && ti.isdef(theta);
    const _issph = o =>
           ti.isdef(rho)
        && ti.isdef(theta)
        && ti.isdef(phi);
    const _iscyl = o => 
           ti.isdef(rho)
        && ti.isdef(theta)
        && ti.isdef(zeta);
    const _isangles = o =>
            ti.isdef(o.pitch)
        &&  ti.isdef(o.roll)
        &&  ti.isdef(o.yaw);

    // Type Name (key) from Code
    ti.type_names = [
        "complex", 
        "plane",  "pane", 
        "ray3",   "line3",
        "ray2",   "line2",
        "vecsph", "veccyl",    "vecpol",
        "vec4",   "vec3",      "vec2",
        "size",   "rectangle", "point",
        "angles"
    ];

    // Type Code from Name (key)
    ti.type_code = key => 
        (a=>a.indexOf(key))(ti.type_names);
    
        // Type Name from Instance
    ti.typeof = o => {
        ;[
            _iscplx,   _isplane,   _ispane,
            _isray3,   _isline3,
            _isray2,   _isline2,
            _issph,    _iscyl,    _ispol,
            _isvec4,   _isvec3,   _isvec2,
            _issize,   _isrect,   _ispnt, 
            _isangles
        ].findIndex(fn=>fn(o));
    }

    // Real Part (Re)
    const _re = n => {
        if (_ispol(n)) {
            return n.rho * Math.cos(n.theta);
        } else {
            return _cplx(n).re;
        }
    }
    // _re.vec4 = n => _vec4(_re(n));

    // Imaginary Part (Im)
    const _im = n => {
        if (_ispol(n)) {
            return n.rho * Math.sin(n.theta);
        } else {
            return _cplx(n).im;
        }
    }
    // _im.vec4 = n => _vec4(_im(n));

    // Complex Angle (argument)
    const _arg = (n, o) => {
        if (arg === null) return undefined;
        if (Array.isArray(n)) {
            return Math.hypot(... n);
        } else {
            // https://chat.openai.com/c/6baeba4b-e49e-447e-813b-096bf9b70493
            const t = typeof n;
            switch (t) {
            case 'undefined': return undefined;
            case 'function' : return _arg(n(o));
            case 'number'   : return Math.abs(n);
            case 'boolean'  : return n ? 1 : 0;
            case 'bigint'   : return (n < 0) ? -n : n;
            case 'object'   : return TODO("_arg:object");
            default: return undefined;
            }
        }
        const v = _vec4(n);
        return Math.hypot(v.x, v.y, v.z, v.w);
    }
    // _arg.vec4 = n => _vec4(_arg(n));

    // Complex Radius (modulus)
    const _mod = n => {
        const t = ti.typeof(n);
        switch(t) {
        case "vec2": {};
        case "vec3": {};
        case "vec5": {};
        case "cplx": {};
        case "vec2": {};
        case "vec2": {};
        case "vec2": {};
        case "vec2": {};
        case "vec2": {};
        case "vec2": {};
        case "vec2": {};
        case "vec2": {};
        }
    };
    // _mod.vec4 = n => _vec4(_mod(n));

    // Convert to NATURAL NUMBER
    const _N = n => {
        return _parseInt(max(_arg(n), 1));
    };
    // _N.vec4 = n => _vec4(_N(n));

    // Convert to WHOLE NUMBER
    const _W = n => {
        return _parseInt(max(_arg(n), 0));
    };
    // _W.vec4 = n => _vec4(_W(n));

    // Convert to INTEGER
    const _I = n => {
        if (Number.isInteger(n)) {
            return parseInt(n);
        }
        return parseInt(_R(n)) || 0;
    };
    // _I.vec4 = n => _vec4(_I(n));
    
    // Convert to REAL
    const _R = n => {
       if (ti.is.object(n)) {
            return _arg(n);
       }
       n = parseFloat(n);
       if (isFinite(n)) return n;
       return 0;
    };
    // _R.vec4 = n => _vec4(_R(n));
    
    // Convert to COMPLEX
    const _C = n => {
        return _cplx(_vec4(n));
    }
    // _C.vec4 = n => _vec4(_C(n));

    // Scale vector to unit length
    const _normalize = v => {
        v = _vec4(v);
        let k = _dot(v, v);
        if (k < 1e-20) {
            return _vec4(1);
        } else {
            k = 1 / Math.sqrt(k);
            return _vec4(k*v.x, k*v.y, k*v.z, k*v.w)
        }
    }
    
    // Reduce a vector by one dimension
    const _vec_descend = v => {
        const t = ti.typeof(v);
        switch (t) {
        case "vec4": {
            const k = 1 / (v.w || 1);
            return _vec3(v.x*k, v.y*k, v.z*k);
        }
        case "vec3": {
            const k = 1 / (v.z || 1);
            return _vec2(v.x*k, v.y*k);
        }
        case "vec2": {
            const k = 1 / (v.y || 1);
            return (v.x*k);
        }
        default: _throw_einval(v, 'vector');
        }
    }

    //====================================
    // ==> TEMPORARY HACK <==
    const _flatten = _vec_descend;
    //====================================

    // Extend a vector by one dimension
    const _vec_ascend = v => {
        const t = ti.typeof(v);
        switch (t) {
        case "vec4": {
            const k = 1 / (v.w || 1);
            return _vec3(v.x*k, v.y*k, v.z*k);
        }
        case "vec3": {
            const k = 1 / (v.z || 1);
            return _vec2(v.x*k, v.y*k);
        }
        case "vec2": {
            const k = 1 / (v.y || 1);
            return (v.x*k);
        }
        default: _throw_einval(v, 'vector');
        }
    }

    // Same as:
    //     | a  b |
    // det |      | = ad - bc
    //     | c  d |
    const _dot_perp  = (u, v) => {
        if (!_isvec2(u)) _throw_einval();
        if (!_isvec2(v)) _throw_einval();
        const x = u.x * v.y;
        const y = u.y * v.x;
        return x - y;
    }

    const _dot = (u, v) => {
        TODO("dot");
    }
    
    const _cross  = (u, v) => {
        TODO("cross");
    }

    //========================================================
    // START OF CLASSES

    // Complex Number
    const _cplx = (re, im) => {
        if (ti.is.object(re)) {
            return (o=>{
                return _cplx(o.x, o.y);
            })(_vec4(re));
            // vec4 is the workhorse
        } else {
            re = _R(re);
            im = _R(im);
        }
        return { re, im };
    }

    //------------------------------------------
    // REQUIRED: TO and FROM, ASSERT, VEC4
    _cplx.from = {};
    _cplx.to = {};
    _cplx.assert = o => {
        if (_iscplx(o)) return boss.icon.ok;
        _throw_einval(o, '_cplx');
    }
    _cplx.vec4 = c => {
        _cplx.assert(c);
        return _vec4(o.re, o.im, 1, 1);
    }
    //------------------------------------------

    _cplx.to.pol = c => {
        _cplx.assert(c);
        return _vecpol(_mod(c), _arg(c));
    }
    _cplx.to.cyl = c => {
        // assert is implicit
        return _veccyl(_cplx.to.pol(c));
    }
    _cplx.to.sph = c => {
        // assert is implicit
        return _vecsph(_vecpol(_mod(c), _arg(c)));
    }
    _cplx.to.vec3 = c => {
        _cplx.assert(c);
        return _vec3(o.re, o.im, 1);
    }
    _cplx.to.vec2 = c => {
        _cplx.assert(c);
        return _vec2(o.re, o.im);
    }
    _cplx.to.ray2 = (c, origin) => {
        _cplx.assert(c);
        return _ray2(origin, _cplx.vec2(c));
    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Size
    // Points, sizes and rects are Integers
    const _size = (w=0, h=0) => {
        if (ti.is.object(w)) {
            TODO("_size");
        } else {
            w = _I(w);
            h = _I(h);
        }
        return { w, h };
    }
    //------------------------------------------
    // REQUIRED: TO and FROM, ASSERT, VEC4
    _size.from = {};
    _size.to = {};
    _size.assert = o => {
        if (_issize(o)) return boss.icon.ok;
        _throw_einval(o, '_size');
    }
    _size.vec4 = o => {
        _size.assert(c);
        return _vec4(0, 0, o.w, o.h);
    }
    //------------------------------------------

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Rectangle
    // Points, sizes and rects are Integers
    const _rect = (left=0, top=0, right=0, bottom=0) => {
        if (ti.is.object(left)) {
            TODO("_rect");
        } else {
            left   = _I(left);
            right  = _I(right);
            top    = _I(top);
            bottom = _I(bottom);
        };
        return { 
            left, 
            top, 
            right, 
            bottom 
        };
    }
    //------------------------------------------
    // REQUIRED: TO and FROM, ASSERT, VEC4
    _rect.from = {};
    _rect.to = {};
    _rect.assert = o => {
        if (_isrect(o)) return boss.icon.ok;
        _throw_einval(o, '_rect');
    }
    _rect.vec4 = o => {
        _rect.assert(o);
        return _vec4(
            o.left,  o.top,
            o.right, o.bottom
        );
    }
    //------------------------------------------

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Point
    // Points, sizes and rects are Integers
    const _pnt = (i=0, j=0) => {
        if (ti.is.object(i)) {
            TODO("_pnt");
        } else {
            i = _I(i);
            j = _I(j);
        };
        return { i, j };
    }
    //------------------------------------------
    // REQUIRED: TO and FROM, ASSERT, VEC4
    _pnt.from = {};
    _pnt.to = {};
    _pnt.assert = o => {
        if (_ispnt(o)) return boss.icon.ok;
        _throw_einval(o, '_pnt');
    }
    _pnt.vec4 = o => {
        _pnt.assert(o);
        return _vec4(o.i, o.j, 1, 1);
    }
    //------------------------------------------

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Pane
    const _pane = (x=0, y=0, w=0, h=0) => {
        if (ti.is.object(x)) {
            TODO("_pane");
        } else {
            x = _R(x);
            y = _R(y);
            w = _R(w);
            h = _R(h);
        };
        return { x, y, w, h };
    }
    //------------------------------------------
    // REQUIRED: TO and FROM, ASSERT, VEC4
    _pane.from = {};
    _pane.to = {};
    _pane.assert = o => {
        if (_ispane(o)) return boss.icon.ok;
        _throw_einval(o, '_pane');
    }
    _pane.vec4 = o => {
        _cplx.assert(o);
        return _vec4(o.x, o.y, o.w, o.h);
    }
    //------------------------------------------

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Vec2
    const _vec2 = (x=0, y=0) => {
        if (_isobj(x)) {
            TODO("_vec2")
        } else {
            x = _R(x);
            y = _R(y);
        }
        return { x, y };
    }
    //------------------------------------------
    // REQUIRED: TO and FROM, ASSERT, VEC4
    _vec2.from = {};
    _vec2.to = {};
    _vec2.assert = o => {
        if (_isvec2(o)) return boss.icon.ok;
        _throw_einval(o, '_vec2');
    }
    _vec2.vec4 = o => {
        _vec2.assert(o);
        return _vec4(o.x, o.y, 1, 1);
    }
    //------------------------------------------

    _vec2.to.cplx = o => {
        _vec2.assert(o);
        return _cplx(o.x, o.y);
    }
    _vec2.to.pol = o => {
        _vec2.assert(o);
        const rho = _mod(o);
        const theta = _arg(o);
        return _cplx.to.pol(rho, theta)
    }
    _vec2.to.vec3 = o => {
        _vec2.assert(o);
        return _vec3(o.x, o.y, 1);
    };
    _vec2.to.vec4 =  o => vec2.vec4;
    _vec2.to.pnt  =  o => {
        _vec2.assert(o);
        return _pnt(o.x, o.y);
    };
    // Zero origin; o is the normal
    _vec2.to.ray = o => {
        _vec2.assert(o);
        return _ray2(_vec2(), o);
    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Vec3
    const _vec3 = (x=0, y=0, z=0) => {
        if (_isobj(x)) {
            TODO("_vec2")
        } else {
            x = _R(x);
            y = _R(y);
            z = _R(y);
        }
        return { x, y, z };
    }
    //------------------------------------------
    // REQUIRED: TO and FROM, ASSERT, VEC4
    _vec3.from = {};
    _vec3.to = {};
    _vec3.assert = o => {
        if (_isvec3(o)) return boss.icon.ok;
        _throw_einval(o, '_vec3');
    }
    _vec3.vec4 = o => {
        _vec3.assert(o);
        return _vec4(o.x, o.y, o.z, 1);
    }
    //------------------------------------------

    _vec3.to = {};
    _vec3.to.cyl = o => {
        _vec3.assert(o);
        const rho   = Math.hypot(o.x, o.y);
        const theta = Math.atan2(o.y, o.x);;
        const zeta  = o.z;
        return _veccyl(rho, theta, zeta);
    };
    _vec3.to.sph = o =>  {
        _vec3.assert(o);
        const rho   = Math.hypot(o.x, o.y, o.z);
        const theta = Math.atan2(o.z, rho);;
        const phi   = Math.acos(o.z, rho);
        return _vecsph(rho, theta, phi);
    };
    _vec3.to.vec2 = o => {
        _vec3.assert(o);
        return _flatten(o);
    }
    _vec3.to.vec4 = o => {
        _vec3.assert(o);
        return _vec3(o.x, o.y, o.z, 1);
    }
    // Zero origin; o is the normal
    _vec3.to.ray = o => {
        _vec3.assert(o);
        return _ray3(_vec3(), o);
    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Ray2
    const _ray2 = (origin={}, normal={}) => {
        if (_isobj(origin)) {
            TODO("ray2");
        } else {
            origin = _vec2(origin);
            normal = _normalize(_vec2(normal));
        }
        return { origin, normal }
    }
    //------------------------------------------
    // REQUIRED: TO and FROM, ASSERT, VEC4
    _ray2.from = {};
    _ray2.to = {};
    _ray2.assert = o => {
        if (_isray2(o)) return boss.icon.ok;
        _throw_einval(o, '_ray2');
    }
    _ray2.vec4 = o => {
        _ray2.assert(o);
        return _vec4(
            o.normal.x,
            o.normal.y,
        );
    }
    //------------------------------------------

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Ray3
    const _ray3 = (origin={}, normal={}) => {
        if (_isobj(origin)) {
            TODO("ray3");
        } else {
            origin = _vec3(origin);
            normal = _normalize(_vec3(normal));
        }
        return { origin, normal }
    }
    //------------------------------------------
    // REQUIRED: TO and FROM, ASSERT, VEC4
    _ray3.from = {};
    _ray3.to = {};
    _ray3.assert = o => {
        if (_isray3(o)) return boss.icon.ok;
        _throw_einval(o, '_ray3');
    }
    _ray3.vec4 = o => {
        _ray3.assert(o);
        return _vec4(
            o.normal.x,
            o.normal.y,
            o.normal.z
        );
    }
    //------------------------------------------

    TODO("EVERY CLASS NEEDS THIS TOO")
    _ray3.to.vec4 = _ray3.vec4;

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Plane
    const _plane = (a=0, b=0, c=0, d=0) => {
        if (ti.is.object(a)) {
            TODO("plane");
        } else {
            a = _R(a);
            b = _R(b);
            c = _R(c);
            d = _R(d);
        };
        return { a, b, c, d };
    }
    //------------------------------------------
    // REQUIRED: TO and FROM, ASSERT, VEC4
    _plane.from = {};
    _plane.to = {};
    _plane.assert = o => {
        if (_isplane(o)) return boss.icon.ok;
        _throw_einval(o, '_plane');
    }
    _plane.vec4 = o => {
        _plane.assert(o);
        return _vec4(
            o.a, o.b, o.c, o.d
        );
    }

    _plane.to.vec4 = _plane.vec4;

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // VecPol
    const _vecpol = (rho=0, theta=0) => {
        if (ti.is.object(rho)) {
            TODO("_vecpol");
        } else {
            rho   = _R(rho);
            theta = _R(theta);
        };
        return { rho, theta };
    }
    //------------------------------------------
    // REQUIRED: TO and FROM, ASSERT, VEC4
    _vecpol.from = {};
    _vecpol.to = {};
    _vecpol.assert = o => {
        if (_ispol(o)) return boss.icon.ok;
        _throw_einval(o, '_vecpol');
    }
    _vecpol.vec4 = o => {
        _vecpol.assert(o);
        _vec4(_re(o), _im(o), 1, 1);
    }
    //------------------------------------------

    _vecpol.to.cplx = o => {
        _vecpol.assert(o);
        return _cplx(_re(o), _im(o));
    }
    _vecpol.to.cyl = o => {
        _vecpol.assert(o);
        return _veccyl(o.rho. o.theta);
    }
    _vecpol.to.sph = o => {
        _vecpol.assert(o);
        return _vecsph(o.rho. o.theta);
    }
    _vecpol.to.vec4 = _vecpol.vec4;

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // VecSph
    const _vecsph = (rho=0, theta=0, phi=0) => {
        if (ti.is.object(rho)) {
            TODO("_vecsph");
        } else {
            rho   = _R(rho);
            theta = _R(theta);
            phi   = _R(phi);
        };
        return { rho, theta, phi };
    }
    //------------------------------------------
    // REQUIRED: TO and FROM, ASSERT, VEC4
    _vecsph.from = {};
    _vecsph.to = {};
    _vecsph.assert = o => {
        if (_issph(o)) return boss.icon.ok;
        _throw_einval(o, '_vecsph');
    }
    _vecsph.vec4 = o => {
        _vecsph.assert(o);
        TODO("Convert spherical to vec4");
    }
    //------------------------------------------

    _vecsph.to.cyl = o => {
        TODO("Convert spherical to cylindrical");        
    }
    _vecsph.to.pol = o => {
        TODO("Convert spherical to polar");        
    }
    _vecsph.to.vec4 = _vecsph.vec4;

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // VecCyl
    const _veccyl = (rho=0, theta=0, zeta=0) => {
        if (isobj(rho)) {
            TODO("_veccyl");
        } else {
            rho   = _R(rho);
            theta = _R(theta);
            zeta  = _R(zeta);
        }
        return {
            rho, theta, zeta
        }
    }
    //------------------------------------------
    // REQUIRED: TO and FROM, ASSERT, VEC4
    _veccyl.from = {};
    _veccyl.to = {};
    _veccyl.assert = o => {
        if (_iscyl(o)) return boss.icon.ok;
        _throw_einval(o, '_veccyl');
    }
    _veccyl.vec4 = o => {
        _veccyl.assert(o);
        TODO("Convert cylindrical to vec4");        
    }
    //------------------------------------------

    _veccyl.to.sph = o => {
        TODO("Convert cylindrical to spherical");        
    }
    _veccyl.to.pol = o => {
        TODO("Convert cylindrical to polar");        
    }
    _veccyl.to.vec4 = _veccyl.vec4;

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Line2
    const _line2 = (origin={}, target={}) => {
        TODO("_line3.vec4");
    }
    //------------------------------------------
    // REQUIRED: TO and FROM, ASSERT, VEC4
    _line2.from = {};
    _line2.to = {};
    _line2.assert = o => {
        if (_isline2(o)) return boss.icon.ok;
        _throw_einval(o, '_line2');
    }
    _line2.vec4 = o => {
        _line2.assert(o);
        TODO("_line2.vec4");        
    }
    //------------------------------------------

    _line2.to.vec4 = _line2.vec4;

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Line3
    const _line3 = (origin={}, target={}) => {
        TODO("_line3");
    }
    //------------------------------------------
    // REQUIRED: TO and FROM, ASSERT, VEC4
    _line3.from = {};
    _line3.to = {};
    _line3.assert = o => {
        if (_isline3(o)) return boss.icon.ok;
        _throw_einval(o, '_line3');
    }
    _line3.vec4 = o => {
        _line3.assert(o);
        TODO("_line3.vec4");        
    }
    //------------------------------------------
    
    _line3.to.vec4 = _line2.vec4;

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // https://en.wikipedia.org/wiki/Euler_angles
    const _angles = (pitch=0, roll=0, yaw=0) => {
        TODO("_angles");
        return { pitch, roll, yaw };
    }
    //------------------------------------------
    // REQUIRED: TO and FROM, ASSERT, VEC4
    _angles.from = {};
    _angles.to = {};
    _angles.assert = o => {
        if (_isangles(o)) return boss.icon.ok;
        _throw_einval(o, '_angles');
    }
    _angles.vec4 = o => {
        _line3.assert(o);
        TODO("_angles.vec4");        
    }
    //------------------------------------------

    _angles.to.vec4 = _line2.vec4;

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Vec4
    // vec4 is the workhorse
    const _vec4 = (x=0, y=0, z=0, w=0) => {
        if (_isvec4(x)) return x; // SIMPLEST CASE!
        if (ti.is.object(x)) {
            const o = x;
            const fn=_null;
            switch(ti.typeof(o)) {
            case "point":     fn=_pnt;       break;
            case "size" :     fn=_size;      break;
            case "rectangle": fn=_rect;      break;
            case "complex":   fn=_cplx;      break;
            case "vec2":      fn=_vec2;      break;
            case "vec3":      fn=_vec3;      break;
//          case "vec4":      fn=_vec4;      break; <= SEE ABOVE
            case "ray2":      fn=_ray2;      break;
            case "ray3":      fn=_ray3;      break;
            case "plane":     fn=_plane;     break;
            case "pane":      fn=_pane;      break;
            case "vecpol":    fn=_vec_pol;   break;
            case "vecsph":    fn=_vec_sph;   break;
            case "veccyl":    fn=_vec_cyl;   break;
            case "line2":     fn=_line2;     break;
            case "line3":     fn=_line3;     break;
            case "angled":    fn=_angles;    break;
            default:          _throw_einval();
            }
            return fn.vec4(o);
        } else {
            x = _R(x);
            y = _R(y);
            z = _R(z);
            w = _R(w);
        };
        return { x, y, z, w };
    }
    // TO and FROM
    _vec4.to = {};
    _vec4.from = {};
    _vec4.assert = o => {
        if (_isvec4(o)) return boss.icon.ok;
        _throw_einval(o, '_vec4');
    };
    _vec4.vec4 = o => {
        _vec4.assert(o)
        return _vec4(o.x, o.y, o.y, o.y);
    }
    _vec4.to.pnt    = o => {
        _vec4.assert(o);
        o = _vec4.to.vec2(o);
        return _pol(_mod(o),_arg(o))
    };
    _vec4.to.size   = o => {
        _vec4.assert(o);
        const dx = o.z - o.x;
        const dy = o.w - o.y;
        return _size(dx, dy);
    };
    _vec4.to.rect   = o => {
        _vec4.assert(o);
        return _rect(o.x,o.y,o.z,o.w);
    };
    _vec4.to.cplx   = o => {
        o = vec4.to.vec2(o);
        return _vec2.to.cplx(o);
    };
    _vec4.to.vec2   = o => {
        _vec4.assert(o);
        return _vec_descend(_vec_descend(o));
    };
    _vec4.to.vec3   = o => {
        _vec4.assert(o);
        return _vec_descend(o);         // vec3
    };
    _vec4.to.vec4   = _vec4.vec4;
    _vec4.to.ray2   = o => {
        _vec4.assert(o);
        const normal = _vec2(o.x, o.y);
        return _ray2(_vec2(), normal);
    };
    _vec4.to.ray3   = o => {
        const normal = _vec3(o.x, o.y, o.z);
        return _ray3(_vec3(), normal);
    };
    _vec4.to.plane  = o => {
        _vec4.assert(o);
        return _plane(o.x, o.y, o.z, o.w);
    };
    _vec4.to.pane   = o => {
        _vec4.assert(o);
        return _pane(o.x, o.y, o.z, o.w);
    };
    _vec4.to.line2  = o => {
        _vec4.assert(o);
        const origin = _vec2(o.x, o.y);
        const target = _vec2(o.z, o.w);
        return _line2();
    };
    _vec4.to.line3  = o => {
        _vec4.assert(o);
        _throw_eilseq(o);
    };
    _vec4.to.pol    = o => {
        LOOK("Could this be optimized?");
        o = _vec4.to.cyl(o);
        return _cyl.to.pol(o);
    };
    _vec4.to.sph    = o => {
        _vec4.assert(o);
        TODO("_vec4.to.sph");
    };
    _vec4.to.cyl    = o => {
        _vec4.assert(o);
        TODO("_vec4.to.cyl");
    };
    _vec4.to.angles = o => {
        _vec4.assert(o);
        TODO("_vec4.to.angles");
    };

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // TO: Size
    _size.from.vec4   = _vec4.to.size;
    // TO: Rectangle
    _rect.from.vec4   = _vec4.to.rect;
    // TO: Point
    _pnt.from.vec4    = _vec4.to.pnt;
    // TO: Pane
    _pane.from.vec4   = _vec4.to.pane;
    // TO: Vec2
    _vec2.from.cmplx  = _cplx.to.vec2;
    _vec2.from.pol    = _vecpol.to.vec2;
    _vec2.from.vec3   = _vec3.to.vec2;
    _vec2.from.vec4   = _vec4.to.vec2;
    _vec2.from.pnt    = _pnt.to.vec2;
    _vec2.from.ray    = _ray2.to.vec2;
    // TO: Vec3
    _vec3.from.vec4   = _vec4.to.vec3;
    _vec3.from.vec2   = _vec2.to.vec3;
    _vec3.from.cyl    = _veccyl.to.vec3;
    _vec3.from.sph    = _vecsph.to.vec3;
    _vec3.from.ray    = _ray3.to.vec3;
    // TO: Vec4
    _vec4.from.pnt    = _pnt.vec4;
    _vec4.from.size   = _size.vec4;
    _vec4.from.rect   = _rect.vec4;
    _vec4.from.cplx   = _cplx.vec4;
    _vec4.from.vec2   = _vec2.vec4;
    _vec4.from.vec3   = _vec3.vec4;
    _vec4.from.vec4   = _vec4.vec4;
    _vec4.from.ray2   = _ray2.vec4;
    _vec4.from.ray3   = _ray3.vec4;
    _vec4.from.plane  = _plane.vec4;
    _vec4.from.pane   = _pane.vec4;
    _vec4.from.line2  = _line2.vec4;
    _vec4.from.line3  = _line3.vec4;
    _vec4.from.pol    = _vecpol.vec4;
    _vec4.from.sph    = _vecsph.vec4;
    _vec4.from.cyl    = _veccyl.vec4;
    _vec4.from.angles = _angles.vec4;
    // What did we miss? Plane? Angles? Rays? Lines?

    // END OF CLASSES
    //==================================================

    return {
        title     : "Math API",
        version   : boss.version,
        comment   : boss.comment,
        typeinfo  : ti,
        todo      : TODO,
        look      : LOOK,
        flatten   : _flatten,
        normalize : _normalize,
        dot       : _dot,
        cross     : _cross,
        perpdot   : _dot_perp,
        Re        : _re,  
        Im        : _im,
        arg       : _arg,
        mod       : _mod,
        Point     : _pnt,
        Size      : _size,
        Rect      : _rect,
        Pane      : _pane,
        Vec2      : _vec2,
        Vec3      : _vec3,
        Vec4      : _vec4,
        Ray2      : _ray2,
        Ray3      : _ray3,
        Line2     : _line2,
        Line3     : _line3,
        Plane     : _plane,
        Polar     : _vecpol,
        VecSph    : _vecsph,
        VecCyl    : _veccyl,
        Complex   : _cplx,
        Angles    : _angles,
        to : {
            real        : _R,
            integer     : _I,
            whole       : _W,
            natural     : _N,
            complex     : _C,
            polar       : _vecpol,
            cylindrical : _veccyl,
            spherical   : _vecsph,
            cartesian   : _vec4,
        },
        constants   : {
            PI      : Math.PI,
            E       : Math.E,
            I       : _cplx(0, 1),
            PHI     : 0.5 * (1 + Math.sqrt(5)),
            SQRT2   : Math.SQRT2,
            SQRT1_2 : Math.SQRT1_2,
            D2R     : Math.PI / 180,
            R2D     : 180 / Math.PI,
        }
    };
}

// Do it!!!
const LOOK = boss.look;
const TODO = boss.todo;
boss.add_api(api_key, init);

})(CrustyRusty, 'math');


//------------------------------------------------------
// HTML DOM API
;((boss, api_key)=>{

function init() {

    if (_is_node_js_) {
        _log.rusty.says("No DOM API for node.js")
        return {
            title   : "DOM API",
            version : "(n/a)",
            comment: "The DOM API is not available"
        }
    }

    const _todo = __dave_TODO_dave__;

    const _wnd = window;
    const _doc = document;
    const _ti = CrustyRusty.api.typeinfo;

    const _qfn = [ 
        'querySelector',
        'querySelectorAll' 
    ];

    const _qse = _qfn[0];
    const _qsa = _qfn[1];
    const _qry1x = (css, p=_doc) => (p[_qse])(css);
    const _qryAx = (css, p=_doc) => (p[_qsa])(css);
    const _qry1  = css => _qry1x(css, _doc);
    const _qryA  = css => _qryAx(css, _doc);
    
    const _query = {
        qfn     : _qfn, 
        qse     : _qse, 
        qsa     : _qsa, 
        qry1    : _qry1, 
        qry1x   : _qry1x,
        qryA    : _qryA, 
        qryAx   : _qryAx
    };

    LOOK("This should convert args (obj) into URLSearchParams");
    TODO('DOM API => param() function');
    const _params = obj => {
        if (_ti.isobject.iterable(obj)) {
            obj = { ... obj };
            const params = new URLSearchParams;
            for (let key of obj) {
                params.add(key, obj[key]);
            }
            return params;
        } else {
            // How about iterables? (for-in loop)
            _todo("ANY OTHER SENSIBLE THINGS TO DO?");
            return undefined;
        }
    }

    const _navto = (url, hash='', query='') => {
        TODO("hash and query args");
        _wnd.location = new URL(url);
        return _icon.success;
    };

    const _visit = (url, hash='', query='') => {
        TODO("hash and query args");
        _wnd.open(new URL(url));
        return _icon.success;
    };

    const _ai    = ()  => _visit(_chatgpt);
    
    // http://dave-tower/nyteowl/app/zing
    const _zing  = qry  => {
        const host = boss.host;
        const path = `${host}/zing`;
        const url  = new URL(path);
        url.search = new URLSearchParams(qry); // _params
        return _visit(url);
    };
    
    const _bing  = qry => {
        const host = boss.host;
        const path = `https://www.bing.com/search`;
        const url  = new URL(path);
        url.search = new URLSearchParams(qry);
        return _visit(url);
    };

    const _regi = {
        root    : _qry1(':root'),
        head    : _doc.head,
        body    : _doc.body,
        header  : _qry1('header'),
        footer  : _qry1('footer'),
        main    : _qry1('main'),
        all     : (tag => _qryA(tag)),
        zing    : _zing,
        navto   : _navto,
        visit   : _visit,
        bing    : _bing,
        ai      : _ai,
        params  : _params,
    };

    // Find or create
    const _focr = (tag, parent) =>
    {
       let e = qry1(tag); 
       if (e) return e;
       e = el(tag); 
       if (parent) parent.appendChild(e);
       return e;
    }

    window.el = (typeof el != 'function') ? (()=>{
        const el1 = t => doc.createElement(t);
        const el2 = (t, s) => {
           const e = el1(t);
           e.innerText = s;
           return e;
        }
        const _el = (t, s) => {
           return s  ?
           el2(t, s) :
           el1(t)    ;
        }    
        return _el;
    })() : el;

    // https://chat.openai.com/c/01577e4d-7847-4f7c-82c8-7ce052ace62d
    window.el = { 
        ... window.el, 
        ... {
            // Long forms (for old guys like me)
            find           : _qry1,
            find_all       : _qryA,
            find_or_create : _focr,
            content        : {
                document   : _doc,
                body       : _doc.body,
                head       : _doc.head,
                main       : _qry1('main')
            }
        },
        // Short forms (for cool people)
        // focr, qry1, qryA, doc (see squery object)
        query : _query,     // DOM Queries
        regi  : _regi       // Search Engine Queries
    };

    return {
        title   : "DOM API",
        version : boss.version,
        comment : boss.comment,
        el      : window.el,
    }

}

// Do it!!!
const LOOK = boss.look;
const TODO = boss.todo;
boss.add_api(api_key, init);

})(CrustyRusty, 'dom');

//------------------------------------------------------
// BOM API - Browser Object Model
;((boss, api_key)=>{

function init() {

    if (_is_node_js_) {
        boss.says("No BOM API for node.js")
        return {
            title   : "BOM API",
            version : "(n/a)",
            comment: "The BOM API is not available"
        }
    }

    const _wnd = window;
    const _doc = document;
    const _ti  = boss.api.typeinfo;
    const _todo = __dave_TODO_dave__;

    // Whole number
    const _W = n => {
        n = parseInt(n);
        return (n < 0 ? 0 : n);
    };

    // Natural number
    const _N = n => {
        n = parseInt(n);
        return (n < 1 ? 1 : n);
    };

    // Integer
    const _I = n => {
        return parseInt(n);
    };
    
    // Math API
    const _math = {
        int     : _I,
        whole   : _W,
        natural : _N,
    };

    // Size
    const _size = (w, h) => {
        w = _N(w);
        h = _N(h);
        return { w, h };
    };

    // Point
    const _pnt = (x, y) => {
        x = _I(x);
        y = _I(y);
        return { x, y };
    };

    // Rect
    const _rect = (left, top, right, bottom) => {
        return { 
            left   : _I(left), 
            top    : _I(top),
            right  : _I(right), 
            bottom : _I(bottom)
        };
    }

    // Geometry API
    const _geom = {
        Point : _pnt,
        Size  : _size,
        Rect  : _rect,
    };

    // Screen
    const _screen_size = () =>
        (o => _size(o.width, o.height))(_wnd.screen);

    // View
    const _view_size = () => 
        (o => _size(o.innerWidth, o.innerHeight))(_wnd);        

    // Document
    const _document_size = () => 
        (o => _size(o.scrollWidth, o.scrollHeight))
            (_doc.documentElement);

    // Scroll
    const _scroll_position = () => 
    (o =>
        _pnt(
            o.scrollX || (o.pageXOffset || 0),
            o.scrollY || (o.pageYOffset || 0)
        )
    )(wnd);

    // Full Public API
    return {
        title   : "BOM API",
        version : boss.version,
        comment : boss.comment,
        system: {
            window   : _wnd, 
            document : _doc, 
            typeinfo : _ti,
        },
        math : _math,
        geom : _geom,
        size : {
            screen   : _screen_size,
            viewport : _view_size,
            document : _document_size
        },
        position : {
            scroll  : _scroll_position,
            mouse   : _todo,
            browser : _todo
        }
    }
}

// Do it!!!
const LOOK = boss.look;
const TODO = boss.todo;
boss.add_api(api_key, init);
    
})(CrustyRusty, 'bom');


//------------------------------------------------------
// [[ YOUR NEXT AWESOME ]] API
;((boss, api_key)=>{

function init() {

    const _todo = __dave_TODO_dave__;

    //
    // ===> INTERNALS GO HERE!
    //
    const _notice = "I need a new API soon!";

    return {
        title   : "My Future API",
        version : boss.version,
        comment : boss.comment,
        tipme   : boss.tipme,
        todo    : _notice
        // PUT YOUR INTERFACE HERE!
    };

}

// Do it!!!
const LOOK = boss.look;
const TODO = boss.todo;
boss.add_api(api_key, init);

})(CrustyRusty, 'future');

//------------------------------------------------------
// IDEAS for Future APIs
//
// Date/Time
// Greek Cipher
// Errno
// Clickable FieldSet/Table
// Drop-In Script Editor (Mobius)
// Math Depot
// Anthem
// Emoji Magic
// Ping
// 
